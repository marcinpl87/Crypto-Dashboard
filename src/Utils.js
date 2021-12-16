import React from 'react';
import ReactDOM from 'react-dom';

class Utils {
    findArrValById(arr, id, column = 1) {
        var resultArr = (arr.filter((value) => {
            return value[0]==id;
        }))[0];
        return resultArr ? resultArr[column] : 0;
    }
    replaceAll(str, find, replace) {
        return String(str).replace(
            new RegExp(find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1'), 'g'),
            replace
        );
    }
    mRound(num, position = 2) {
        return Number(parseFloat(num).toFixed(position));
    }
    expiredSessionHandler() {
        console.log('User session error');
        setTimeout(() => {
            location.reload();
        }, 5000);
    }
    ajax(method, url, data) {
        return $.ajax({
            method: method,
            url: '/wp-json/mapi/' + url,
            dataType: 'json',
            data: data,
            beforeSend: (xhr) => {
                xhr.setRequestHeader(
                    'x-wp-nonce',
                    document
                        .querySelector('.app-container')
                        .getAttribute('data-nonce')
                );
            }
        });
    }
    objPick(obj, props) {
        return props.reduce(
            (a, e) => (
                a[e] = obj[e],
                a
            ),
            {}
        );
    }
}

export default new Utils();
