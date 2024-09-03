/* 여기에 코드를 입력하세요. */

//현재 선택 메뉴
let currentAvatarKey = 'tone';

//현재 아바타의 상태를 저장할 객체 만들기
const currentAvatar = {
    tone: 'tone_300',
    hair_type: 'hair_short3',
    hair_color: 'black',
    clothes: 'hoodie',
    accessories: 'acc_none',
  };


const avatarMenu = document.querySelector('#avatar-menu');
const avatarSelectors = document.querySelectorAll('.avatar-selector');
const avatarMenuItems = avatarMenu.querySelectorAll('.avatar-menu-item');

avatarMenu.addEventListener('click', handleAvatarMenuClick);


function updateAvatarMenu(avatarKey) {
    //selector를 바꿔줌.
    for (const avatarSelector of avatarSelectors) {
        //selector과 menuItem의 avatarKey가 같으면 active 추가.
        //토글함수는 두번째 파라미터가 true이면 추가, flase이면 제거
        avatarSelector.classList.toggle(
            'active',
            avatarSelector.dataset.avatarKey === avatarKey
        );
    }

    //menu의 강조를 바꿔줌
    for (const avatarMenuItem of avatarMenuItems) {
        avatarMenuItem.classList.toggle(
            'active', 
            avatarMenuItem.dataset.avatarKey === avatarKey
        );
    }
}



function handleAvatarMenuClick(e) {
    //현재 이벤트가 일어난 avatarkey를 할당
    const nextAvatarKey = e.target.dataset.avatarKey;
    //
    if (!nextAvatarKey) return;
    //현재 avatarKey로 할당
    currentAvatarKey = nextAvatarKey;
    updateAvatarMenu(currentAvatarKey);
}

//--------------------


//모든 selector에 이벤트 등록
for (const avatarSelector of avatarSelectors) {
    avatarSelector.addEventListener('click', handleAvatarSelectorClick);
}


const avatarImages = document.querySelectorAll('.avatar-image');

function updateAvatar(avatarKey, avatarValue) {
    //현재 객체를 변경해줌
    currentAvatar[avatarKey] = avatarValue;

    //아바타 이미지 변경해주기
    let imageKey = avatarKey;
    let filename = currentAvatar[avatarKey];
    //hair_type이나 hair_color가 avatarKey로 들어오면 type과 color를 하나로 합쳐야함.
    if (avatarKey.indexOf('hair') === 0) {
        imageKey = 'hair';
        filename = `${currentAvatar.hair_type}-${currentAvatar.hair_color}`;
    }
    
    //이미지 파일을 변경해줌
    for (const avatarImage of avatarImages) {
        if (avatarImage.dataset.imageKey === imageKey) {
            avatarImage.setAttribute('src', `./images/avatar/${filename}.svg`);
            break;
        }
    }
}



function handleAvatarSelectorClick(e) {
    const nextAvatarValue = e.target.dataset.avatarValue;
    if (!nextAvatarValue) return;
    updateAvatar(currentAvatarKey, nextAvatarValue);
}



//이미지 저장하기
const avatar = document.querySelector('#avatar');

const save_button = document.getElementById('save-button');
save_button.addEventListener('click', handelSaveClick);


function handelSaveClick() {
    html2canvas(avatar).then(function (canvas) {
        // <a> 요소를 만들고, 이미지 데이터를 변환해서 주소로 지정한다
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'avatar.png';
        // <a> 태그를 자바스크립트로 클릭한다
        link.click();
    });
}
      