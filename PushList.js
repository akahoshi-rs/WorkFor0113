
//textareaの動作(コピペ)
function flexTextarea(el) {
    const dummy = el.querySelector('.FlexTextarea__dummy')
    el.querySelector('.FlexTextarea__textarea').addEventListener('focus', e => {
        dummy.textContent = e.target.value + '\u200b'
    })
    el.querySelector('.FlexTextarea__textarea').addEventListener('input', e => {
        dummy.textContent = e.target.value + '\u200b'
    })
}

document.querySelectorAll('.FlexTextarea').forEach(flexTextarea)
////////////////////////////////////////

//右クリックの非表示
document.oncontextmenu = function () { return false; }
//second-を追加していく親要素
const ContentsArea = document.getElementsByClassName('contents')[0];
//textareaに入れられた文字(.value)
const Contents = document.getElementById('flexTextarea__textarea');
//previewコンテナ
const Preview = document.getElementsByClassName('preview')[0];
//送信ボタン(shift+enter)
const Button = document.getElementsByClassName('btn-enter')[0];
//body部
let body = document.body;
//閉じるボタン
const CloseWindow = document.getElementById('batu');
//TermList
const TermList = document.querySelectorAll('.ListDetails ol');
const BlankList = document.getElementById('blank-list');
//second-termの取得(初期読み込み)
const TermBoxes = document.querySelectorAll(".second-term");

//first-termの取得
const FirstTerm = document.getElementById('first-term');
const FirstTermList = document.querySelector('#TermList .first-term');

//op-formの取得
const FTWindow = document.getElementById('firstTermWindow');
FirstTerm.addEventListener('click', function (e) {
    FTWindow.style.left = (e.pageX - 200) + 'px';
    FTWindow.style.top = (e.pageY - 100) + 'px';
    //メニューをblockで表示
    FTWindow.classList.add('show');
    CloseWindow.style.boxShadow = '1px 1px 3px rgba(34,0,102,0.2)';
});
CloseWindow.addEventListener('mousedown', function () {
    const Main = document.getElementById('Main');
    let _space = document.getElementsByClassName('space');
    CloseWindow.style.boxShadow = 'inset 2px 2px 6px rgba(34,0,102,0.2)';
    if (Main.value.length > 0) {
        let _firstterm = Main.value;
        FirstTermList.innerHTML = _firstterm;
        FirstTerm.innerHTML = _firstterm;
        Preview.textContent = _firstterm;
    } else if (Main.value.length == 0) {

    }
});
CloseWindow.addEventListener('mouseup', function () {
    if (FTWindow.classList.contains('show')) {
        FTWindow.classList.remove('show');
    }
});

//second-termのdivをつくる
let _classCount = 1;
function clone() {
    const TermBox = document.createElement('div');
    TermBox.draggable = true;
    TermBox.className = 'second-term drag-drop term_' + _classCount;
    //管理番号を追加
    ContentsArea.appendChild(TermBox);
}

//TermListのliの追加
function ListPush() {
    const ListPush = document.createElement('li');
    ListPush.className = 'Term-List term_' + _classCount;
    //管理番号を追加
    BlankList.appendChild(ListPush);
};
//ListPushの取得
const ListPushes = document.querySelectorAll('#TermList .Term-List');
//_Textcontent.valueをlistに代入
let _ContentsTextArray = [];

//オリジナル コンテキストメニュー
let con = document.getElementById('conmenu');
//sakuzyo
const Sakuzyo = document.getElementById('sakuzyo');
//innyou
const innyou = document.getElementById('innyou');

//Enter時の処理
function WordPush() {
    //_ContentsTextArrayに追加する
    _ContentsTextArray[_ContentsTextArray.length] = [Contents.value];
    let _length = _ContentsTextArray.length - 1;
    //second-termに追加する
    clone();
    let TermBoxes = document.querySelectorAll(".second-term");
    //TermListに追加する
    ListPush();
    let ListPushes = document.querySelectorAll('#TermList .Term-List');

    //LISTとTERMのVALUEをARRAYから持ってくる
    TermBoxes[_length].innerHTML = _ContentsTextArray[_length];
    // TermBoxesと同じクラス名を持つListPushesに代入
    for (let i = 0; i < _ContentsTextArray.length; i++) {
        if (ListPushes[i].classList.contains(TermBoxes[_length].classList[2])) {
            ListPushes[i].innerHTML = _ContentsTextArray[_length];
        }
    }
    //Previewコンテナに一時的に表示
    Preview.textContent = _ContentsTextArray[_length];

    //単語の取得
    for (let i = 0; i < _ContentsTextArray.length; i++) {

        //listからプレビューの表示
        ListPushes[i].addEventListener('click', function () {
            Preview.textContent = this.innerHTML;
        });

        TermBoxes[i].addEventListener('contextmenu', function (e) {
            // プレビューの表示
            Preview.textContent = TermBoxes[i].innerHTML;
            //マウスの位置を使ってスタイルを設定する
            con.style.left = e.pageX + 'px';
            con.style.top = e.pageY + 'px';
            //メニューをblockで表示
            con.classList.add('show');
            e.target.classList.add('delete');
            for (let i = 0; i < _ContentsTextArray.length; i++) {
                let ListPushes = document.querySelectorAll('#TermList .Term-List');
                let _ListIn = ListPushes[i].classList.contains(e.target.classList[2]);
                if (_ListIn == true) {
                    ListPushes[i].classList.add('delete-list');
                }
            }

            const TermDelete = document.getElementsByClassName('delete');
            const ListDelete = document.getElementsByClassName('delete-list');

            innyou.addEventListener('click', function () {
                Contents.value = TermBoxes[i].innerHTML;
            });

            Sakuzyo.addEventListener('click', function () {
                let result = _ContentsTextArray.splice(i, TermDelete.length);
                result = _ContentsTextArray;
                if (ListDelete.length > 0) {
                    ListDelete[0].remove();
                }
                if (TermDelete.length > 0) {
                    TermDelete[0].remove();
                }
            });


            //左クリックで非表示に変更
            body.addEventListener('click', function () {
                if (con.classList.contains('show')) {
                    //非表示に戻す
                    con.classList.remove('show');
                }
                if (TermBoxes[i].classList.contains('delete')) {
                    TermBoxes[i].classList.remove('delete');
                }
                for (let i = 0; i < _ContentsTextArray.length; i++) {
                    let ListPushes = document.querySelectorAll('#TermList .Term-List');
                    let _ListIn = ListPushes[i].classList.contains(e.target.classList[2]);
                    if (_ListIn == true) {
                        if (ListPushes[i].classList.contains('delete-list')) {
                            ListPushes[i].classList.remove('delete-list');
                        }
                    }
                }
            });
        });

        ListPushes[i].addEventListener('contextmenu', function (e) {
            Preview.textContent = TermBoxes[i].innerHTML;
            //マウスの位置を使ってスタイルを設定する
            con.style.left = e.pageX + 'px';
            con.style.top = e.pageY + 'px';
            //メニューをblockで表示
            con.classList.add('show');
            ListPushes[i].classList.add('delete-list');
            for (let i = 0; i < _ContentsTextArray.length; i++) {
                let TermBoxes = document.querySelectorAll(".second-term");
                let _ListIn = TermBoxes[i].classList.contains(e.target.classList[1]);
                if (_ListIn == true) {
                    TermBoxes[i].classList.add('delete');
                }
            }

            const TermDelete = document.getElementsByClassName('delete');
            const ListDelete = document.getElementsByClassName('delete-list');
            let innerTerm = ListDelete[0].innerHTML;

            innyou.addEventListener('click', function () {
                Contents.value = ListPushes[i].innerHTML;
            });

            Sakuzyo.addEventListener('click', function () {
                let result = _ContentsTextArray.splice(i, TermDelete.length);
                result = _ContentsTextArray;
                if (ListDelete.length > 0) {
                    ListDelete[0].remove();
                }
                if (TermDelete.length > 0) {
                    TermDelete[0].remove();
                }
            });


            //左クリックで非表示に変更
            body.addEventListener('click', function () {
                if (con.classList.contains('show')) {
                    //非表示に戻す
                    con.classList.remove('show');
                }
                for (let i = 0; i < _ContentsTextArray.length; i++) {
                    let TermBoxes = document.querySelectorAll(".second-term");
                    let _ListIn = TermBoxes[i].classList.contains(e.target.classList[1]);
                    if (_ListIn == true) {
                        if (TermBoxes[i].classList.contains('delete')) {
                            TermBoxes[i].classList.remove('delete');
                        }
                    }
                }
                if (ListPushes[i].classList.contains('delete-list')) {
                    ListPushes[i].classList.remove('delete-list');
                }
            });

        });

        //エリア移動の取得
        TermBoxes[i].addEventListener('mousedown', function () {
            TermBoxes[i].classList.add('appending');
        });

        TermBoxes[i].addEventListener('mousemove', function (e) {
            if (TermBoxes[i].classList.contains('appending')) {
                if (TermBoxes[i].classList.contains('area1')) {
                    // リストをクラス名で判別
                    for (let i = 0; i < _ContentsTextArray.length; i++) {
                        let ListPushes = document.querySelectorAll('#TermList .Term-List');
                        let _ListIn = ListPushes[i].classList.contains(e.target.classList[2]);
                        if (_ListIn == true) {
                            TermList[0].appendChild(ListPushes[i]);
                            ListPushes[i].style.boxShadow = "inset 0 2px 6px" + Sub1Color.value;
                            e.target.style.border = "3px solid" + Sub1Color.value;
                        }
                    }
                } else if (TermBoxes[i].classList.contains('area2')) {
                    for (let i = 0; i < _ContentsTextArray.length; i++) {
                        let ListPushes = document.querySelectorAll('#TermList .Term-List');
                        let _ListIn = ListPushes[i].classList.contains(e.target.classList[2]);
                        if (_ListIn == true) {
                            TermList[1].appendChild(ListPushes[i]);
                            ListPushes[i].style.boxShadow = "inset 0 2px 6px" + Sub2Color.value;
                            e.target.style.border = "3px solid" + Sub2Color.value;
                        }
                    }
                } else if (TermBoxes[i].classList.contains('area3')) {
                    for (let i = 0; i < _ContentsTextArray.length; i++) {
                        let ListPushes = document.querySelectorAll('#TermList .Term-List');
                        let _ListIn = ListPushes[i].classList.contains(e.target.classList[2]);
                        if (_ListIn == true) {
                            TermList[2].appendChild(ListPushes[i]);
                            ListPushes[i].style.boxShadow = "inset 0 2px 6px" + Sub3Color.value;
                            e.target.style.border = "3px solid" + Sub3Color.value;
                        }
                    }
                };
            }
        });

        TermBoxes[i].addEventListener('mouseup', function (e) {
            if (TermBoxes[i].classList.contains('appending')) {
                if (TermBoxes[i].classList.contains('area1')) {
                    // リストをクラス名で判別
                    for (let i = 0; i < _ContentsTextArray.length; i++) {
                        let ListPushes = document.querySelectorAll('#TermList .Term-List');
                        let _ListIn = ListPushes[i].classList.contains(e.target.classList[2]);
                        if (_ListIn == true) {
                            TermList[0].appendChild(ListPushes[i]);
                            ListPushes[i].style.boxShadow = "inset 0 2px 6px" + Sub1Color.value;
                            e.target.style.border = "3px solid" + Sub1Color.value;
                        }
                    }
                } else if (TermBoxes[i].classList.contains('area2')) {
                    for (let i = 0; i < _ContentsTextArray.length; i++) {
                        let ListPushes = document.querySelectorAll('#TermList .Term-List');
                        let _ListIn = ListPushes[i].classList.contains(e.target.classList[2]);
                        if (_ListIn == true) {
                            TermList[1].appendChild(ListPushes[i]);
                            ListPushes[i].style.boxShadow = "inset 0 2px 6px" + Sub2Color.value;
                            e.target.style.border = "3px solid" + Sub2Color.value;
                        }
                    }
                } else if (TermBoxes[i].classList.contains('area3')) {
                    for (let i = 0; i < _ContentsTextArray.length; i++) {
                        let ListPushes = document.querySelectorAll('#TermList .Term-List');
                        let _ListIn = ListPushes[i].classList.contains(e.target.classList[2]);
                        if (_ListIn == true) {
                            TermList[2].appendChild(ListPushes[i]);
                            ListPushes[i].style.boxShadow = "inset 0 2px 6px" + Sub3Color.value;
                            e.target.style.border = "3px solid" + Sub3Color.value;
                        }
                    }
                };
            }
            setTimeout(function () {
                if (TermBoxes[i].classList.contains('appending')) {
                    TermBoxes[i].classList.remove('appending');
                }
            }, 750);
        });
        TermBoxes[i].addEventListener('mouseout', function (e) {
            if (TermBoxes[i].classList.contains('appending')) {
                if (TermBoxes[i].classList.contains('area1')) {
                    // リストをクラス名で判別
                    for (let i = 0; i < _ContentsTextArray.length; i++) {
                        let ListPushes = document.querySelectorAll('#TermList .Term-List');
                        let _ListIn = ListPushes[i].classList.contains(e.target.classList[2]);
                        if (_ListIn == true) {
                            TermList[0].appendChild(ListPushes[i]);
                            ListPushes[i].style.boxShadow = "inset 0 2px 6px" + Sub1Color.value;
                            e.target.style.border = "3px solid" + Sub1Color.value;
                        }
                    }
                } else if (TermBoxes[i].classList.contains('area2')) {
                    for (let i = 0; i < _ContentsTextArray.length; i++) {
                        let ListPushes = document.querySelectorAll('#TermList .Term-List');
                        let _ListIn = ListPushes[i].classList.contains(e.target.classList[2]);
                        if (_ListIn == true) {
                            TermList[1].appendChild(ListPushes[i]);
                            ListPushes[i].style.boxShadow = "inset 0 2px 6px" + Sub2Color.value;
                            e.target.style.border = "3px solid" + Sub2Color.value;
                        }
                    }
                } else if (TermBoxes[i].classList.contains('area3')) {
                    for (let i = 0; i < _ContentsTextArray.length; i++) {
                        let ListPushes = document.querySelectorAll('#TermList .Term-List');
                        let _ListIn = ListPushes[i].classList.contains(e.target.classList[2]);
                        if (_ListIn == true) {
                            TermList[2].appendChild(ListPushes[i]);
                            ListPushes[i].style.boxShadow = "inset 0 2px 6px" + Sub3Color.value;
                            e.target.style.border = "3px solid" + Sub3Color.value;
                        }
                    }
                };
            }
            setTimeout(function () {
                if (TermBoxes[i].classList.contains('appending')) {
                    TermBoxes[i].classList.remove('appending');
                }
            }, 750);
        });

    }

    //textboxを空にする
    Contents.value = "";
}


Contents.addEventListener("keydown", function () {
    if (event.shiftKey == true) {
        if (event.keyCode == 13) {
            WordPush();
            _classCount = _classCount + 1;
        }
    }
});

Button.addEventListener("click", function () {
    WordPush();
    _classCount = _classCount + 1;
});

//op-formのテキストと色を読み込み
const MainTermColor = document.getElementById("color");
const Sub1Color = document.getElementById("color1");
const Sub2Color = document.getElementById("color2");
const Sub3Color = document.getElementById("color3");
const Sub1Text = document.getElementById("Sub-1");
const Sub2Text = document.getElementById("Sub-2");
const Sub3Text = document.getElementById("Sub-3");

MainTermColor.addEventListener('input', function () {
    FirstTerm.style.backgroundColor = MainTermColor.value;
    FirstTermList.style.backgroundColor = MainTermColor.value;
});


//画像書き出しの実装

const loading = document.getElementById('loading');
const save = document.getElementById('btn-save');
const SeeingArea = document.getElementById("contentsArea");

save.addEventListener('click', function () {
    html2canvas(document.getElementById("contentsArea")).then(canvas => {
        var imageData = canvas.toDataURL();
        document.getElementById('result').setAttribute("src", canvas.toDataURL());
        document.getElementById("plotter-img").href = imageData;
    });
});

loading.addEventListener('click', function () {
    html2canvas(document.getElementById("contentsArea")).then(canvas => {
        var imageData = canvas.toDataURL();
        document.getElementById('result').setAttribute("src", canvas.toDataURL());
        document.getElementById("plotter-img").href = imageData;
    });

});

//テキスト書き出しの実装
const PlotterText = document.getElementById('plotter-text');

let _TermList0 = document.querySelectorAll('#blank-list .Term-List');
let _TermList1 = document.querySelectorAll('#List1 li');
let _TermList2 = document.querySelectorAll('#List2 li');
let _TermList3 = document.querySelectorAll('#List3 li');


PlotterText.addEventListener('click', function () {
    _TermList0 = document.querySelectorAll('#blank-list .Term-List');
    _TermList1 = document.querySelectorAll('#List1 li');
    _TermList2 = document.querySelectorAll('#List2 li');
    _TermList3 = document.querySelectorAll('#List3 li');

    //
    let _array0 = [];
    for (let i = 0; i < _TermList0.length; i++) {
        _array0.push(_TermList0[i].innerHTML);
    }
    let _string0 = _array0.join('\n');

    //
    let _array1 = [];
    for (let i = 0; i < _TermList1.length; i++) {
        _array1.push(_TermList1[i].innerHTML);
    }
    let _string1 = _array1.join('\n');

    //
    let _array2 = [];
    for (let i = 0; i < _TermList2.length; i++) {
        _array2.push(_TermList2[i].innerHTML);
    }
    let _string2 = _array2.join('\n');

    //
    let _array3 = [];
    for (let i = 0; i < _TermList3.length; i++) {
        _array3.push(_TermList3[i].innerHTML);
    }
    let _string3 = _array3.join('\n');


    let _blob0123 = _string0 + '\n' + '\n' + Sub1Text.value + '\n' + _string1 + '\n' + '\n' + Sub2Text.value + '\n' + _string2 + '\n' + '\n' + Sub3Text.value + '\n' + _string3;
    let _blob012 = _string0 + '\n' + '\n' + Sub1Text.value + '\n' + _string1 + '\n' + '\n' + Sub2Text.value + '\n' + _string2;
    let _blob013 = _string0 + '\n' + '\n' + Sub1Text.value + '\n' + _string1 + '\n' + '\n' + Sub3Text.value + '\n' + _string3;
    let _blob023 = _string0 + '\n' + '\n' + Sub2Text.value + '\n' + _string2 + '\n' + '\n' + Sub3Text.value + '\n' + _string3;
    let _blob123 = Sub1Text.value + '\n' + _string1 + '\n' + '\n' + Sub2Text.value + '\n' + _string2 + '\n' + '\n' + Sub3Text.value + '\n' + _string3;
    let _blob01 = _string0 + '\n' + '\n' + Sub1Text.value + '\n' + _string1;
    let _blob02 = _string0 + '\n' + '\n' + Sub2Text.value + '\n' + _string2;
    let _blob03 = _string0 + '\n' + '\n' + Sub3Text.value + '\n' + _string3;
    let _blob12 = Sub1Text.value + '\n' + _string1 + '\n' + '\n' + Sub2Text.value + '\n' + _string2;
    let _blob13 = Sub1Text.value + '\n' + _string1 + '\n' + '\n' + Sub3Text.value + '\n' + _string3;
    let _blob23 = Sub2Text.value + '\n' + _string2 + '\n' + '\n' + Sub3Text.value + '\n' + _string3;
    let _blob0 = _string0;
    let _blob1 = Sub1Text.value + '\n' + _string1;
    let _blob2 = Sub2Text.value + '\n' + _string2;
    let _blob3 = Sub3Text.value + '\n' + _string3;

    //
    if (_TermList0.length == 0) {
        if (_TermList1.length == 0) {
            if (_TermList2.length == 0) {
                if (_TermList3.length == 0) {
                    alert('値を入力してください');
                } else {
                    let _blobout = new Blob([_blob3], { type: "text/plan" });
                    let link = document.createElement('a');
                    link.href = URL.createObjectURL(_blobout);
                    link.download = (FirstTerm.innerHTML + '.txt');
                    document.body.appendChild(link);
                    link.click();
                }
            } else if (_TermList3.length == 0) {
                let _blobout = new Blob([_blob2], { type: "text/plan" });
                let link = document.createElement('a');
                link.href = URL.createObjectURL(_blobout);
                link.download = FirstTerm.innerHTML + '.txt';
                document.body.appendChild(link);
                link.click();
            } else {
                let _blobout = new Blob([_blob23], { type: "text/plan" });
                let link = document.createElement('a');
                link.href = URL.createObjectURL(_blobout);
                link.download = FirstTerm.innerHTML + '.txt';
                document.body.appendChild(link);
                link.click();
            }
        } else if (_TermList2.length == 0) {
            if (_TermList1.length == 0) {
                let _blobout = new Blob([_blob1], { type: "text/plan" });
                let link = document.createElement('a');
                link.href = URL.createObjectURL(_blobout);
                link.download = FirstTerm.innerHTML + '.txt';
                document.body.appendChild(link);
                link.click();
            } else if (_TermList3.length == 0) {
                let _blobout = new Blob([_blob3], { type: "text/plan" });
                let link = document.createElement('a');
                link.href = URL.createObjectURL(_blobout);
                link.download = FirstTerm.innerHTML + '.txt';
                document.body.appendChild(link);
                link.click();
            } else {
                let _blobout = new Blob([_blob13], { type: "text/plan" });
                let link = document.createElement('a');
                link.href = URL.createObjectURL(_blobout);
                link.download = FirstTerm.innerHTML + '.txt';
                document.body.appendChild(link);
                link.click();
            }
        } else if (_TermList3.length == 0) {
            if (_TermList1.length == 0) {
                let _blobout = new Blob([_blob1], { type: "text/plan" });
                let link = document.createElement('a');
                link.href = URL.createObjectURL(_blobout);
                link.download = FirstTerm.innerHTML + '.txt';
                document.body.appendChild(link);
                link.click();
            } else if (_TermList2.length == 0) {
                let _blobout = new Blob([_blob2], { type: "text/plan" });
                let link = document.createElement('a');
                link.href = URL.createObjectURL(_blobout);
                link.download = FirstTerm.innerHTML + '.txt';
                document.body.appendChild(link);
                link.click();
            } else {
                let _blobout = new Blob([_blob12], { type: "text/plan" });
                let link = document.createElement('a');
                link.href = URL.createObjectURL(_blobout);
                link.download = FirstTerm.innerHTML + '.txt';
                document.body.appendChild(link);
                link.click();
            }
        } else {
            let _blobout = new Blob([_blob123], { type: "text/plan" });
            let link = document.createElement('a');
            link.href = URL.createObjectURL(_blobout);
            link.download = FirstTerm.innerHTML + '.txt';
            document.body.appendChild(link);
            link.click();
        }
    } else if (_TermList1.length == 0) {
        if (_TermList2.length == 0) {
            if (_TermList3.length == 0) {
                let _blobout = new Blob([_blob0], { type: "text/plan" });
                let link = document.createElement('a');
                link.href = URL.createObjectURL(_blobout);
                link.download = FirstTerm.innerHTML + '.txt';
                document.body.appendChild(link);
                link.click();
            } else if (_TermList3.length == 0) {
                let _blobout = new Blob([_blob02], { type: "text/plan" });
                let link = document.createElement('a');
                link.href = URL.createObjectURL(_blobout);
                link.download = FirstTerm.innerHTML + '.txt';
                document.body.appendChild(link);
                link.click();
            } else {
                let _blobout = new Blob([_blob03], { type: "text/plan" });
                let link = document.createElement('a');
                link.href = URL.createObjectURL(_blobout);
                link.download = FirstTerm.innerHTML + '.txt';
                document.body.appendChild(link);
                link.click();
            }
        } else if (_TermList2.length == 0) {
            if (_TermList3.length == 0) {
                let _blobout = new Blob([_blob01], { type: "text/plan" });
                let link = document.createElement('a');
                link.href = URL.createObjectURL(_blobout);
                link.download = FirstTerm.innerHTML + '.txt';
                document.body.appendChild(link);
                link.click();
            } else {
                let _blobout = new Blob([_blob013], { type: "text/plan" });
                let link = document.createElement('a');
                link.href = URL.createObjectURL(_blobout);
                link.download = FirstTerm.innerHTML + '.txt';
                document.body.appendChild(link);
                link.click();
            }
        } else if (_TermList3.length == 0) {
            let _blobout = new Blob([_blob012], { type: "text/plan" });
            let link = document.createElement('a');
            link.href = URL.createObjectURL(_blobout);
            link.download = FirstTerm.innerHTML + '.txt';
            document.body.appendChild(link);
            link.click();
        } else {
            let _blobout = new Blob([_blob023], { type: "text/plan" });
            let link = document.createElement('a');
            link.href = URL.createObjectURL(_blobout);
            link.download = FirstTerm.innerHTML + '.txt';
            document.body.appendChild(link);
            link.click();
        }
    } else {
        let _blobout = new Blob([_blob0123], { type: "text/plan" });
        let link = document.createElement('a');
        link.href = URL.createObjectURL(_blobout);
        link.download = (FirstTerm.innerHTML + '.txt');
        document.body.appendChild(link);
        link.click();
    }

});