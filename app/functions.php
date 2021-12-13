<?php
include("token.php"); //this file includes only one variable: $token = "...";

function mCurl($action, $token, $url, $params = false) {
    $ch = curl_init();
    curl_setopt(
        $ch,
        CURLOPT_RETURNTRANSFER,
        true
    );
    if ($action == "post") {
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
    if (($action == "get") && $params) {
        $url = $url
            ."?"
            .http_build_query($params);
    }
    curl_setopt(
        $ch,
        CURLOPT_URL,
        $url
    );
    curl_setopt(
        $ch,
        CURLOPT_HTTPHEADER,
        [
            "x-rapidapi-host: alpha-vantage.p.rapidapi.com",
            "x-rapidapi-key: ".$token,
        ]
    );
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
        echo "--- Request URL ".$url." returned HTTP_CODE ".$rescode."\n";
        die;
        return false;
    }
}

?>
