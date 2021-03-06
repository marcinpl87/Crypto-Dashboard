import React, {
    useState,
    useEffect,
} from 'react';
import ReactDOM from 'react-dom';
import Card from './Card';

const LS_KEY = 'CryptoDashState'; //Local Storage key name

const chunks = (arr, size = 2) => {
    return arr
        .map((x, i) => i % size == 0 && arr.slice(
            i,
            i + size
        ))
        .filter(x => x);
}

const Row = (props) => {
    return (
        <div className="row">
            {props.symbol.map((sym, k) => (
                <Col
                    key={
                        Math.random()
                    }
                    isDarkMode={
                        props.isDarkMode
                    }
                    symbol={
                        sym
                    }
                    setSymbol={
                        props.setSymbol
                    }
                    delSymbol={
                        props.delSymbol
                    }
                />
            ))}
        </div>
    );
};

const Col = (props) => {
    return (
        <div className="col-md-6">
            <Card
                key={
                    Math.random()
                }
                isDarkMode={
                    props.isDarkMode
                }
                sid={
                    props.symbol.id
                }
                symbol={
                    props.symbol
                }
                setSymbol={
                    props.setSymbol
                }
                delSymbol={
                    props.delSymbol
                }
            />
        </div>
    );
};

export default (props) => {
    const [
        symbols,
        setSymbols,
    ] = useState(() => JSON.parse(
        localStorage.getItem(LS_KEY)
    ) || [
        {
            'id': 1,
            'type': '',
            'name': '',
        },
    ]);
    useEffect(
        () => {
            localStorage.setItem(
                LS_KEY,
                JSON.stringify(
                    symbols
                )
            );
        },
        [
            LS_KEY,
            symbols,
        ]
    );
    const symbolEdit = (id, type, symbol) => {
        const objIndex = symbols.findIndex(
            obj => obj.id == id
        );
        symbols[objIndex] = {
            'id': id,
            'type': type,
            'name': symbol,
        };
        symbolCheckAndAdd(symbols);
        setSymbols(
            JSON.parse(
                JSON.stringify(
                    symbols
                )
            )
        ); //clone object to force render
    };
    const symbolCheckAndAdd = (data) => {
        const maxId = (parseInt(Math.max(
            ...data.map(
                obj => obj.id
            )
        )) || 0);
        const objIndex = symbols.findIndex(
            obj => obj.id == maxId
        );
        if (!!symbols[objIndex].name) { //no empty chart
            data.push({
                'id': maxId + 1,
                'type': '',
                'name': '',
            });
        }
    };
    const symbolDel = (id) => {
        if (symbols.length > 1) {
            symbols.splice(
                symbols.map(
                    obj => obj.id
                ).indexOf(id),
                1
            );
            setSymbols(
                JSON.parse(
                    JSON.stringify(
                        symbols
                    )
                )
            ); //clone object to force render
        }
    }
    return (
        <div
            className={`
                app-main
                ${
                    props.isDarkMode
                        ? 'dark-mode'
                        : ''
                }
            `}
        >
            {symbols && <div className="container">
                {chunks(symbols).map((sym, k) => (
                    <Row
                        key={k}
                        isDarkMode={
                            props.isDarkMode
                        }
                        symbol={sym}
                        setSymbol={symbolEdit}
                        delSymbol={symbolDel}
                    />
                ))}
            </div>}
        </div>
    );
};
