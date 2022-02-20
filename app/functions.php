<?php
include('token.php'); //this file includes only one variable: $token = '...';

function mCurl($action, $token, $url, $params = false) {
    $ch = curl_init();
    curl_setopt(
        $ch,
        CURLOPT_RETURNTRANSFER,
        true
    );
    if ($action == 'post') {
        curl_setopt(
            $ch,
            CURLOPT_POST,
            1
        );
        if ($params) {
            curl_setopt(
                $ch,
                CURLOPT_POSTFIELDS,
                http_build_query($params)
            );
        }
    }
    if (($action == 'get') && $params) {
        $url = $url
            .'?'
            .http_build_query($params);
    }
    curl_setopt(
        $ch,
        CURLOPT_URL,
        $url
    );
    if ($token) {
        curl_setopt(
            $ch,
            CURLOPT_HTTPHEADER,
            [
                'x-rapidapi-host: alpha-vantage.p.rapidapi.com',
                'x-rapidapi-key: '.$token,
            ]
        );
    }
    $res = curl_exec($ch);
    $rescode = curl_getinfo(
        $ch,
        CURLINFO_HTTP_CODE
    );
    curl_close($ch);
    if ($rescode == 200) {
        return json_decode($res);
    }
    else {
        echo '--- Request URL '.$url.' returned HTTP_CODE '.$rescode.'\n';
        die;
        return false;
    }
}

function getSymbol($symbol) {
    global $token;
    $data = json_decode(
        json_encode(
            mCurl(
                'get',
                $token,
                'https://alpha-vantage.p.rapidapi.com/query',
                [
                    'function' => 'TIME_SERIES_DAILY',
                    'symbol' => $symbol,
                    'outputsize' => 'full',
                    'datatype' => 'json',
                ]
            )
        ),
        true
    );
    $return = [];
    foreach ($data[
        'Time Series (Daily)'
    ] as $date => $price) {
        $return[] = [$date, $price['4. close']];
    }
    return prepareData(
        $return
    );
}

function searchSymbol($query) {
    global $token;
    return mCurl(
        'get',
        $token,
        'https://alpha-vantage.p.rapidapi.com/query',
        [
            'function' => 'SYMBOL_SEARCH',
            'keywords' => $query,
            'datatype' => 'json',
        ]
    )->bestMatches;
}

function searchCryptoSymbol($query) {
    return array_values(
        array_filter(
            mCurl(
                'get',
                false,
                'https://api.coingecko.com/api/v3/coins/list',
                [
                    'include_platform' => 'false'
                ]
            ),
            function($obj) use(&$query) {
                return !(
                    (
                        isset(
                            $obj->name
                        )
                        && strpos(
                            strtolower(
                                str_replace(
                                    ' ',
                                    '',
                                    $obj->name
                                )
                            ),
                            strtolower(
                                str_replace(
                                    ' ',
                                    '',
                                    $query
                                )
                            )
                        ) === false
                    )
                    && (
                        isset(
                            $obj->symbol
                        )
                        && strpos(
                            strtolower(
                                str_replace(
                                    ' ',
                                    '',
                                    $obj->symbol
                                )
                            ),
                            strtolower(
                                str_replace(
                                    ' ',
                                    '',
                                    $query
                                )
                            )
                        ) === false
                    )
                );
            }
        )
    );
}

function prepareData($data) {
    return json_encode(
        array_reverse(
            array_slice(
                $data,
                0,
                500 //return only last 500 elements
            )
        )
    );
}

add_action('rest_api_init', function() use(&$wpdb) {
    register_rest_route('mapi', '/quotes/(?P<symbol>\w+)', [
        'methods' => 'get',
        'permission_callback' => '__return_true',
        'callback' => function(WP_REST_Request $params) use(&$wpdb) {
            header('Content-type:application/json;charset=utf-8');
            $table = 'app_apicache';
            $symbol = $params->get_params()['symbol'];
            $checkSymbol = $wpdb->get_results(
                $wpdb->prepare(
                    '
                        SELECT * FROM `'.$table.'`
                        WHERE `symbol` = %s
                    ',
                    $symbol
                ),
                ARRAY_A
            );
            if (empty($checkSymbol)) { //symbol is not chached
                $apiData = getSymbol($symbol);
                $wpdb->insert(
                    $table,
                    [
                        'date' => date('Y-m-d H:i:s'),
                        'symbol' => $symbol,
                        'update' => date('Y-m-d'),
                        'data' => $apiData,
                    ]
                );
                echo $apiData;
            }
            else { //symbol is cached
                if ($checkSymbol[0][
                    'update'
                ] == date(
                    'Y-m-d'
                ).' 00:00:00') { //cache is up to date
                    echo $checkSymbol[0]['data'];
                }
                else { //cache is old
                    $apiData = getSymbol($symbol);
                    $wpdb->update(
                        $table,
                        [
                            'update' => date('Y-m-d'),
                            'data' => $apiData,
                        ],
                        [
                            'id' => $checkSymbol[0]['id'],
                        ]
                    );
                    echo $apiData;
                }
            }
        },
    ]);
    register_rest_route('mapi', '/search/(?P<query>\w+)', [
        'methods' => 'get',
        'permission_callback' => '__return_true',
        'callback' => function(WP_REST_Request $params) use(&$wpdb) {
            header('Content-type:application/json;charset=utf-8');
            echo json_encode(
                searchSymbol(
                    $params->get_params()['query']
                )
            );
        },
    ]);
    register_rest_route('mapi', '/search-crypto/(?P<query>\w+)', [
        'methods' => 'get',
        'permission_callback' => '__return_true',
        'callback' => function(WP_REST_Request $params) use(&$wpdb) {
            header('Content-type:application/json;charset=utf-8');
            echo json_encode(
                searchCryptoSymbol(
                    $params->get_params()['query']
                )
            );
        },
    ]);
});

?>
