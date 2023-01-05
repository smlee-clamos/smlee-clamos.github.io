const chart = [];
let keys = 0;

async function parseChart(fileName) {
    const res = await fetch(fileName);
    const rawData = await res.text();
    const data = rawData.split(`\n`).map(element => element.trim()).filter(element => element !== ``);

    let isHeader = true;
    for (const datum of data) {
        if (datum === `*---------------------- HEADER FIELD`) {
            // Start Header Field
            const obj = {};
            chart.push(obj);
        } else if (datum === `*---------------------- MAIN DATA FIELD`) {
            // Start Main Data Field
            isHeader = false;
        } else if (isHeader) {
            // Parse Header Field
            const key = datum.slice(1, datum.indexOf(` `));
            const value = datum.slice(datum.indexOf(` `) + 1);
            
            // GENRE - 모드
            if ([`TITLE`, `GENRE`, `ARTIST`, `BPM`, `PLAYLEVEL`, `RANK`].includes(key)) {
                chart[0][key] = value;
            }


        } else {
            // Parse Main Data Field
            const [key, value] = datum.split(`:`);
            const measure = Number(key.slice(1, 4));
            const lane = key.slice(4);

            while (chart.length - 1 < measure) {
                const obj = {};
                chart.push(obj);
            }
            
            chart[measure][lane] = value;
        }
    }

    keys = Number(chart[0][`GENRE`]);

    chartDefault();
}

// 4/4 박자에서 한 마디를 몇 픽셀로 표기할 것인가
const displaySize = 256;

// 노트별 참조 리소스
const noteGreen = `8g.png`;
let noteBlack = ``;
let noteWhite = ``;
let laneWidth = 0;
let chipSize = 5;
let currentOrder = ``;

// 노트 별 리소스 할당
function getNoteResources() {
    switch (keys) {
        case 4:
            noteBlack = `4b.png`;
            noteWhite = `4w.png`;
            laneWidth = 30;
            break;
        case 5:
            noteBlack = `5b.png`;
            noteWhite = `5w.png`;
            laneWidth = 24;
            break;
        case 6:
            noteBlack = `6b.png`;
            noteWhite = `6w.png`;
            laneWidth = 20;
            break;
        case 8:
            noteBlack = `8b.png`;
            noteWhite = `8w.png`;
            laneWidth = 15;
            break;
    }
}

// 해당 레인이 백건반인지 흑건반인지 파악
function getNoteImage(lane) {
    switch (keys) {
        case 4:
            if (lane === 1 || lane === 2) {
                return noteBlack;
            } else {
                return noteWhite;
            }
        case 5:
            if (lane === 1 || lane === 3) {
                return noteBlack;
            } else {
                return noteWhite;
            }
        case 6:
            if (lane === 1 || lane === 4) {
                return noteBlack;
            } else {
                return noteWhite;
            }
        case 8:
            if (lane === 1 || lane === 2) {
                return noteBlack;
            } else if (lane === 0 || lane === 7) {
                return noteGreen;
            } else {
                return noteWhite;
            }
    }
}

// 현재 레인 순서를 화면에 출력할 텍스트로 변환
function getTextFromOrder() {
    switch (keys) {
        case 4:
            return `[${Number(currentOrder) + 1111}]`;
        case 5:
            return `[${Number(currentOrder) + 11111}]`;
        case 6:
            return `[${Number(currentOrder) + 111111}]`;
        case 8:
            return `[${Number(currentOrder) + 11111111}]`;
    }
}

// 차트 그리기
function makeChart() {
    // 기존에 생성된 보면이 있다면 지우고 새로 만들기
    const dataArea = document.getElementById(`data`);
    if (dataArea) {
        dataArea.remove();
        document.getElementById(`order`).innerText = getTextFromOrder();
    }

    // 전역 틀 만들기
    const globalTable = document.createElement(`table`);
    const globalTr = document.createElement(`tr`);
    let globalTd = document.createElement(`td`);

    globalTable.id = `data`;
    globalTable.appendChild(globalTr);

    document.getElementById(`article`).appendChild(globalTable);

    globalTr.appendChild(globalTd);

    // 모드별 버튼 리소스 획득
    getNoteResources();

    // 레인별 롱 노트 종료 여부
    const longAlive = new Array(keys).fill(false);

    // 마디별 노트 작성
    for (let measure = 1; measure < chart.length; measure++) {
        // 곡마다 시작 마디를 설정하면 그 번호가 맨 아래로 가게끔 할 수 있다.
        const measureStart = Number(chart[0][`RANK`]);
        const measureReal = measure - measureStart;
        if (measureReal >= 0 && measureReal % 4 === 0) {
            globalTd = document.createElement(`td`);
            globalTr.appendChild(globalTd);
        }

        // 지역 틀 만들기
        const localTable = document.createElement(`table`);
        const localTr = document.createElement(`tr`);
        
        globalTd.insertBefore(localTable, globalTd.firstChild);
        localTable.appendChild(localTr);
        localTable.className = `fixed`;
        
        const localTh = document.createElement(`th`);
        const localTd = document.createElement(`td`);
        const div = document.createElement(`div`);
        
        localTr.appendChild(localTh);
        localTr.appendChild(localTd);
        localTh.innerHTML = measure;
        localTd.className = `chart`;
        localTd.appendChild(div);
        
        // 레인별 노트 위치
        let chipArray = null;
        let longArray = null;
        switch (keys) {
            case 4:
                chipArray = [chart[measure][`11`], chart[measure][`12`], chart[measure][`14`], chart[measure][`15`]];
                longArray = [chart[measure][`51`], chart[measure][`52`], chart[measure][`54`], chart[measure][`55`]];
                break;
            case 5:
                chipArray = [chart[measure][`11`], chart[measure][`12`], chart[measure][`13`], chart[measure][`14`], chart[measure][`15`]];
                longArray = [chart[measure][`51`], chart[measure][`52`], chart[measure][`53`], chart[measure][`54`], chart[measure][`55`]];
                break;
            case 6:
                chipArray = [chart[measure][`11`], chart[measure][`12`], chart[measure][`13`], chart[measure][`15`], chart[measure][`18`], chart[measure][`19`]];
                longArray = [chart[measure][`51`], chart[measure][`52`], chart[measure][`53`], chart[measure][`55`], chart[measure][`58`], chart[measure][`59`]];
                break;
            case 8:
                chipArray = [chart[measure][`16`], chart[measure][`11`], chart[measure][`12`], chart[measure][`13`], chart[measure][`14`], chart[measure][`15`], chart[measure][`18`], chart[measure][`19`]];
                longArray = [chart[measure][`56`], chart[measure][`51`], chart[measure][`52`], chart[measure][`53`], chart[measure][`54`], chart[measure][`55`], chart[measure][`58`], chart[measure][`59`]];
                break;
        }

        // 롱 노트 최종 위치
        const longPos = new Array(keys).fill(0);

        // 레인 재배치
        const order = Array.from(currentOrder);
        switch (keys) {
            case 4:
                [chipArray[0], chipArray[1], chipArray[2], chipArray[3]] =
                [chipArray[order[0]], chipArray[order[1]], chipArray[order[2]], chipArray[order[3]]];
                [longArray[0], longArray[1], longArray[2], longArray[3]] =
                [longArray[order[0]], longArray[order[1]], longArray[order[2]], longArray[order[3]]];
                break;
            case 5:
                [chipArray[0], chipArray[1], chipArray[2], chipArray[3], chipArray[4]] =
                [chipArray[order[0]], chipArray[order[1]], chipArray[order[2]], chipArray[order[3]], chipArray[order[4]]];
                [longArray[0], longArray[1], longArray[2], longArray[3], longArray[4]] =
                [longArray[order[0]], longArray[order[1]], longArray[order[2]], longArray[order[3]], longArray[order[4]]];
                break;
            case 6:
                [chipArray[0], chipArray[1], chipArray[2], chipArray[3], chipArray[4], chipArray[5]] =
                [chipArray[order[0]], chipArray[order[1]], chipArray[order[2]], chipArray[order[3]], chipArray[order[4]], chipArray[order[5]]];
                [longArray[0], longArray[1], longArray[2], longArray[3], longArray[4], longArray[5]] =
                [longArray[order[0]], longArray[order[1]], longArray[order[2]], longArray[order[3]], longArray[order[4]], longArray[order[5]]];
                break;
            case 8:
                [chipArray[0], chipArray[1], chipArray[2], chipArray[3], chipArray[4], chipArray[5], chipArray[6], chipArray[7]] =
                [chipArray[order[0]], chipArray[order[1]], chipArray[order[2]], chipArray[order[3]], chipArray[order[4]], chipArray[order[5]], chipArray[order[6]], chipArray[order[7]]];
                [longArray[0], longArray[1], longArray[2], longArray[3], longArray[4], longArray[5], longArray[6], longArray[7]] =
                [longArray[order[0]], longArray[order[1]], longArray[order[2]], longArray[order[3]], longArray[order[4]], longArray[order[5]], longArray[order[6]], longArray[order[7]]];
                break;
        }

        // 화면에 채보 출력
        makeChartFromArray(div, chipArray, false);
        makeChartFromArray(div, longArray, true, longAlive, longPos);
    }
}

// 주어진 배열에 맞게 채보 작성
function makeChartFromArray(div, inputArray, isLongArray, longAlive = null, longPos = null) {
    const noteLiteral = `01`;
    for (let lane = 0; lane < keys; lane++) {
        if (!isLongArray) {
            // 칩 노트
            const bits = inputArray[lane] ? inputArray[lane].length / 2 : 0;
            for (let pos = 0; pos < bits; pos++) {
                if (inputArray[lane].slice(pos * 2, (pos + 1) * 2) === noteLiteral) {
                    insertNote(div, getNoteImage(lane), `bottom: ${pos * displaySize / bits - 1}px; left: ${lane * laneWidth}px; width: ${laneWidth}px; height: ${chipSize}px;`);
                }
            }
        } else {
            // 롱 노트
            const bits = inputArray[lane] ? inputArray[lane].length / 2 : 0;
            for (let pos = 0; pos < bits; pos++) {
                if (inputArray[lane].slice(pos * 2, (pos + 1) * 2) === noteLiteral) {
                    // 롱노트 시작점을 체크
                    if (!longAlive[lane]) {
                        longPos[lane] = pos;
                    } else {
                        insertNote(div, getNoteImage(lane), `bottom: ${longPos[lane] * displaySize / bits - 1}px; left: ${lane * laneWidth}px; width: ${laneWidth}px; height: ${(pos - longPos[lane]) * displaySize / bits}px;`);
                    }
    
                    // 롱노트 사활 토글
                    longAlive[lane] = !longAlive[lane];
                }
    
                // 다음 마디까지 롱노트가 이어질 때
                if (longAlive[lane] && pos === (bits - 1)) {
                    insertNote(div, getNoteImage(lane), `bottom: ${longPos[lane] * displaySize / bits - 1}px; left: ${lane * laneWidth}px; width: ${laneWidth}px; height: ${(bits - longPos[lane]) * displaySize / bits + 1}px;`);
                }
            }
    
            // 전 마디부터 이번 마디도 꽉 채울 때
            if (longAlive[lane] && !inputArray[lane]) {
                insertNote(div, getNoteImage(lane), `bottom: ${-1}px; left: ${lane * laneWidth}px; width: ${laneWidth}px; height: ${displaySize + 1}px;`);
            }
        }
    }
}

// 노트 위치 설정 후 삽입
function insertNote(div, source, noteStyle) {
    const note = document.createElement(`img`);
    note.src = source;
    note.setAttribute(`style`, noteStyle);
    div.appendChild(note);
}

// 칩 노트 크기 설정
function setChipSize() {
    chipSize = Number(prompt(`칩 노트 크기를 설정해 주세요.`, 5));
    makeChart();
}

// 정규 배치 생성
function chartDefault() {
    switch (keys) {
        case 4:
            currentOrder = `0123`;
            break;
        case 5:
            currentOrder = `01234`;
            break;
        case 6:
            currentOrder = `012345`;
            break;
        case 8:
            currentOrder = `01234567`;
            break;
    }

    makeChart();
}

// 입력받은 텍스트를 재배치할 레인으로 변환
function getOrderFromText(order) {
    switch (keys) {
        case 4:
            order -= 1111;
            break;
        case 5:
            order -= 11111;
            break;
        case 6:
            order -= 111111;
            break;
        case 8:
            order -= 11111111;
            break;
    }

    return String(order).padStart(keys, `0`);
}

// 커스텀 배치 생성
function chartCustom() {
    let example = ``;
    switch (keys) {
        case 4:
            example = `1234`;
            break;
        case 5:
            example = `12345`;
            break;
        case 6:
            example = `123456`;
            break;
        case 8:
            example = `12345678`;
            break;
    }

    const order = prompt(`원하는 랜덤 배치를 입력해주세요.`, example);
    // 유효하지 않은 경우 중도 취소
    if (order.length != keys) {
        alert(`잘못된 입력입니다. 키 수를 맞춰주세요.`);
        return;
    }

    // 입력받은 텍스트를 레인 순서로 변경
    currentOrder = getOrderFromText(order);
    makeChart();
}

// 미러 배치 생성
function chartMirror() {
    switch (keys) {
        case 4:
            currentOrder = `3210`;
            break;
        case 5:
            currentOrder = `43210`;
            break;
        case 6:
            currentOrder = `543210`;
            break;
        case 8:
            currentOrder = `76543210`;
            break;
    }

    makeChart();
}

// 최소 이상 최대 미만에서 임의의 정수 생성
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

// 배열이 주어졌을 때 임의의 레인을 생성
function getRandomOrder(array) {
    let order = ``;
    while (array.length > 0) {
        let num = getRandomInt(0, array.length);
        order += array[num] + ``;
        array.splice(num, 1);
    }
    return order;
}

// 랜덤 배치 생성
function chartRandom() {
    const array = [];
    for (let i = 0; i < keys; i++) {
        array.push(i);
    }

    currentOrder = getRandomOrder(array);
    makeChart();
}

// 플립 및 미러 플립 배치 생성
function chartFlip(isMirrorFlip = false) {
    let left = null;
    let right = null;

    switch (keys) {
        case 4:
        case 5:
            left = [0, 1];
            right = [2, 3];
        break;
        case 6:
            left = [0, 1, 2];
            right = [3, 4, 5];
        break;
        case 8:
            left = [0, 1, 2, 3];
            right = [4, 5, 6, 7];
        break;
    }

    if (isMirrorFlip) {
        [left, right] = [right, left];
    }

    currentOrder = getRandomOrder(left);
    if (keys === 5) {
        currentOrder += `2`;
    }
    currentOrder += getRandomOrder(right);

    makeChart();
}

// 키보드 입력 받기
window.addEventListener(`keydown`, e => {
    switch (e.key) {
        case `d`:
        case `D`:
            chartDefault();
            break;
        case `c`:
        case `C`:
            chartCustom();
            break;
        case `m`:
        case `M`:
            chartMirror();
            break;
        case `r`:
        case `R`:
            chartRandom();
            break;
        case `f`:
        case `F`:
            chartFlip();
            break;
        case `i`:
        case `I`:
            chartFlip(true);
            break;
        case `s`:
        case `S`:
            setChipSize();
            break;
    }
});