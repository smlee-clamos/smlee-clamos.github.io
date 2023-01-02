// 4/4 박자에서 한 마디를 몇 픽셀로 표기할 것인가
const displaySize = 256;
const keys = Number(chart[0][`GENRE`]);
const measureStart = Number(chart[0][`RANK`]);

// 노트별 참조 리소스
let noteGreen = '8g.png';
let noteBlack = '';
let noteWhite = '';
let laneWidth = 0;
let chipSize = 5;
let currentOrder = '';

// 노트 별 리소스 할당
function getNoteResources() {
    switch (keys) {
        case 4:
            noteBlack = '4b.png';
            noteWhite = '4w.png';
            laneWidth = 30;
            break;
        case 5:
            noteBlack = '5b.png';
            noteWhite = '5w.png';
            laneWidth = 24;
            break;
        case 6:
            noteBlack = '6b.png';
            noteWhite = '6w.png';
            laneWidth = 20;
            break;
        case 8:
            noteBlack = '8b.png';
            noteWhite = '8w.png';
            laneWidth = 15;
            break;
    }
}

// 해당 레인이 백건반인지 흑건반인지 파악
function getBlackWhite(lane) {
    switch (keys) {
        case 4:
            if (lane == 1 || lane == 2) {
                return noteBlack;
            } else {
                return noteWhite;
            }
        case 5:
            if (lane == 1 || lane == 3) {
                return noteBlack;
            } else {
                return noteWhite;
            }
        case 6:
            if (lane == 1 || lane == 4) {
                return noteBlack;
            } else {
                return noteWhite;
            }
        case 8:
            if (lane == 1 || lane == 2) {
                return noteBlack;
            } else if (lane == 0 || lane == 7) {
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
    let dataArea = document.getElementById('data');
    if (dataArea) {
        dataArea.remove();
        document.getElementById('order').innerText = getTextFromOrder();
    }

    // 전역 틀 만들기
    let globalTable = document.createElement('table');
    let globalTr = document.createElement('tr');
    let globalTd = document.createElement('td');

    globalTable.id = 'data';
    globalTable.appendChild(globalTr);

    document.getElementById('article').appendChild(globalTable);

    globalTd = document.createElement('td');
    globalTr.appendChild(globalTd);

    // 모드별 버튼 리소스 획득
    getNoteResources();

    // 레인별 롱 노트 종료 여부
    let longAlive = [];
    for (let i = 0; i < keys; i++) {
        longAlive.push(false);
    }

    // 마디별 노트 작성
    for (let measureNo = 1; measureNo < chart.length; measureNo++) {
        // 곡마다 시작 마디를 설정하면 그 번호가 맨 아래로 가게끔 할 수 있다.
        let measureReal = measureNo - measureStart;
        if (measureReal >= 0 && measureReal % 4 == 0) {
            globalTd = document.createElement('td');
            globalTr.appendChild(globalTd);
        }

        // 지역 틀 만들기
        let localTable = document.createElement('table');
        let localTr = document.createElement('tr');
        
        globalTd.insertBefore(localTable, globalTd.firstChild);
        localTable.appendChild(localTr);
        localTable.className = 'fixed';
        
        let localTh = document.createElement('th');
        let localTd = document.createElement('td');
        let div = document.createElement('div');
        
        localTr.appendChild(localTh);
        localTr.appendChild(localTd);
        localTh.innerHTML = measureNo;
        localTd.className = 'chart';
        localTd.appendChild(div);
        
        // 레인별 노트 위치
        let chipArray = [];
        let longArray = [];
        switch (keys) {
            case 4:
                chipArray = [chart[measureNo][12], chart[measureNo][13], chart[measureNo][15], chart[measureNo][18]];
                longArray = [chart[measureNo][52], chart[measureNo][53], chart[measureNo][55], chart[measureNo][58]];
                break;
            case 5:
                chipArray = [chart[measureNo][12], chart[measureNo][13], chart[measureNo][14], chart[measureNo][15], chart[measureNo][18]];
                longArray = [chart[measureNo][52], chart[measureNo][53], chart[measureNo][54], chart[measureNo][55], chart[measureNo][58]];
                break;
            case 6:
                chipArray = [chart[measureNo][11], chart[measureNo][12], chart[measureNo][13], chart[measureNo][14], chart[measureNo][18], chart[measureNo][19]];
                longArray = [chart[measureNo][51], chart[measureNo][52], chart[measureNo][53], chart[measureNo][54], chart[measureNo][58], chart[measureNo][59]];
                break;
            case 8:
                chipArray = [chart[measureNo][16], chart[measureNo][11], chart[measureNo][12], chart[measureNo][13], chart[measureNo][14], chart[measureNo][15], chart[measureNo][18], chart[measureNo][19]];
                longArray = [chart[measureNo][56], chart[measureNo][51], chart[measureNo][52], chart[measureNo][53], chart[measureNo][54], chart[measureNo][55], chart[measureNo][58], chart[measureNo][59]];
                break;
        }

        // 롱 노트 최종 위치
        let longPos = [];
        for (let i = 0; i < keys; i++) {
            longPos.push(0);
        }

        // 레인 재배치
        let order = Array.from(currentOrder);
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

        // 칩 노트
        for (let lane = 0; lane < chipArray.length; lane++) {
            // 마디가 몇 비트로 구성되었는지
            let bits = !chipArray[lane] ? 0 : chipArray[lane].length / 2;
            for (let pos = 0; pos < bits; pos++) {
                // 01 보이면 해당 위치에 노트 작성
                if (chipArray[lane].substring(pos * 2, (pos + 1) * 2) == '01') {
                    let note = document.createElement('img');
                    note.src = getBlackWhite(lane);
                    note.setAttribute('style', `bottom: ${pos * displaySize / bits - 1}px; left: ${lane * laneWidth}px; width: ${laneWidth}px; height: ${chipSize}px;`);
                    div.appendChild(note);
                }
            }
        }

        // 롱 노트
        for (let lane = 0; lane < longArray.length; lane++) {
            // 마디가 몇 비트로 구성되었는지
            let bits = !longArray[lane] ? 0 : longArray[lane].length / 2;
            for (let pos = 0; pos < bits; pos++) {
                // 01 보이면 해당 위치에 노트 작성
                if (longArray[lane].substring(pos * 2, (pos + 1) * 2) == '01') {
                    if (!longAlive[lane]) {
                        longPos[lane] = pos;    // 롱노트 시작점을 체크
                    } else {
                        let note = document.createElement('img');
                        note.src = getBlackWhite(lane);
                        note.setAttribute('style', `bottom: ${longPos[lane] * displaySize / bits - 1}px; left: ${lane * laneWidth}px; width: ${laneWidth}px; height: ${(pos - longPos[lane]) * displaySize / bits}px;`);
                        div.appendChild(note);
                    }

                    // 롱노트 사활 토글
                    longAlive[lane] = !longAlive[lane];
                }

                // 다음 마디까지 롱노트가 이어질 때
                if (longAlive[lane] && (pos == bits - 1)) {
                    let note = document.createElement('img');
                    note.src = getBlackWhite(lane);
                    note.setAttribute('style', `bottom: ${longPos[lane] * displaySize / bits - 1}px; left: ${lane * laneWidth}px; width: ${laneWidth}px; height: ${(bits - longPos[lane]) * displaySize / bits + 1}px;`);
                    div.appendChild(note);
                }
            }

            // 전 마디부터 이번 마디도 꽉 채울 때
            if (longAlive[lane] && !longArray[lane]) {
                let note = document.createElement('img');
                note.src = getBlackWhite(lane);
                note.setAttribute('style', `bottom: ${-1}px; left: ${lane * laneWidth}px; width: ${laneWidth}px; height: ${displaySize + 1}px;`);
                div.appendChild(note);
            }
        }
    }
}

// 칩 노트 크기 설정
function setChipSize() {
    chipSize = Number(prompt('칩 노트 크기를 설정해 주세요.', 5));
}

// 정규 배치 생성
function chartDefault(keys) {
    switch (keys) {
        case 4:
            currentOrder = '0123';
            break;
        case 5:
            currentOrder = '01234';
            break;
        case 6:
            currentOrder = '012345';
            break;
        case 8:
            currentOrder = '01234567';
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

    return order.toString().padStart(keys, '0');
}

// 커스텀 배치 생성
function chartCustom() {
    let example = '';

    switch (keys) {
        case 4:
            example = '1234';
            break;
        case 5:
            example = '12345';
            break;
        case 6:
            example = '123456';
            break;
        case 8:
            example = '12345678';
            break;
    }

    let order = prompt('원하는 랜덤 배치를 입력해주세요.', example);
    // 유효하지 않은 경우 중도 취소
    if (order.length != keys) {
        alert('잘못된 입력입니다. 키 수를 맞춰주세요.');
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
            currentOrder = '3210';
            break;
        case 5:
            currentOrder = '43210';
            break;
        case 6:
            currentOrder = '543210';
            break;
        case 8:
            currentOrder = '76543210';
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
    let order = '';
    while (array.length > 0) {
        let num = getRandomInt(0, array.length);
        order += array[num] + '';
        array.splice(num, 1);
    }
    return order;
}

// 랜덤 배치 생성
function chartRandom(keys) {
    let array = [];
    for (let i = 0; i < keys; i++) {
        array[i] = i;
    }

    currentOrder = getRandomOrder(array);
    makeChart();
}

// 플립 및 미러 플립 배치 생성
function chartFlip(isMirrorFlip = false) {
    let left = [];
    let middle = '2';
    let right = [];

    switch (keys) {
        case 4:
        case 5:
            if (!isMirrorFlip) {
                left = [0, 1];
                right = [2, 3];
            } else {
                right = [0, 1];
                left = [2, 3];
            }
            break;
        case 6:
            if (!isMirrorFlip) {
                left = [0, 1, 2];
                right = [3, 4, 5];
            } else {
                right = [0, 1, 2];
                left = [3, 4, 5];
            }
            break;
        case 8:
            if (!isMirrorFlip) {
                left = [0, 1, 2, 3];
                right = [4, 5, 6, 7];
            } else {
                right = [0, 1, 2, 3];
                left = [4, 5, 6, 7];
            }
            break;
    }

    currentOrder = getRandomOrder(left);
    if (keys == 5) {
        currentOrder += middle;
    }
    currentOrder += getRandomOrder(right);

    makeChart();
}

// 키보드 입력 받기
window.addEventListener("keydown", (e) => {
    switch (e.key) {
        case 'd':
        case 'D':
            chartDefault();
            break;
        case 'c':
        case 'C':
            chartCustom();
            break;
        case 'm':
        case 'M':
            chartMirror();
            break;
        case 'r':
        case 'R':
            chartRandom();
            break;
        case 'f':
        case 'F':
            chartFlip();
            break;
        case 'i':
        case 'I':
            chartFlip(true);
            break;
        case 's':
        case 'S':
            setChipSize();
            break;
    }
});