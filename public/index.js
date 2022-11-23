const url = 'https://backendprogramming.mrgoodway.repl.co';

// menu
const btnLogin = document.querySelector('#btnLogin');
const btnLogout = document.querySelector('#btnLogout');
const btnReg = document.querySelector('#btnReg');
const btnAdmin = document.querySelector('#btnAdmin');
const reg = document.querySelector('#reg');
const admin = document.querySelector('#admin');
const login = document.querySelector('#login');

reg.style.display = 'none';
admin.style.display = 'none';
login.style.display = 'none';

btnLogin.addEventListener('click', () => {
  reg.style.display = 'none';
  admin.style.display = 'none';
  login.style.display = '';
})

btnReg.addEventListener('click', () => {
  reg.style.display = '';
  admin.style.display = 'none';
  login.style.display = 'none';
})

btnAdmin.addEventListener('click', () => {
  reg.style.display = 'none';
  admin.style.display = '';
  login.style.display = 'none';
})

// user
const user = document.querySelector('#user')

if (localStorage.getItem('userId')) {
  user.innerText = `안녕하세요! ${localStorage.getItem('userName')}(${localStorage.getItem('userId')})님!`
  btnLogout.style.display = '';
  btnLogin.style.display = 'none';
} else {
  user.innerText = '로그인을 해주세요!';
  btnLogout.style.display = 'none';
  btnLogin.style.display = '';
}

// login
const loginSubmit = document.querySelector('#loginSubmit')
const loginId = document.querySelector('#loginId')
const loginPw = document.querySelector('#loginPw')

loginSubmit.addEventListener('click', () => {
  const data = {
    userId: loginId.value,
    password: loginPw.value
  }
  fetch(url + '/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      localStorage.setItem('userId', data.userId);
      localStorage.setItem('userName', data.info);
      location.reload();
    })
    .catch((err) => {
      console.error(err);
    })
})

// logout
btnLogout.addEventListener('click', () => {
  localStorage.clear();
  location.reload();
})

// reg
const regId = document.querySelector('#regId')
const regName = document.querySelector('#regName')
const regPw = document.querySelector('#regPw')
const regImg = document.querySelector('#regImg')
const regSubmit = document.querySelector('#regSubmit')

regSubmit.addEventListener('click', () => {
  const formData = new FormData();

  formData.append('userId', regId.value);
  formData.append('password', regPw.value);
  formData.append('info', regName.value);
  formData.append('img', regImg.files[0]);

  fetch(url + '/upload', {
    method: 'POST',
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      location.reload();
    })
    .catch((err) => {
      console.error(err);
    })
})

// admin
const adminList = document.querySelector('#adminList');

fetch(url + '/users')
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    for (let i = 0; i < data.length; i++) {
      const adminRow = document.createElement('li');
      const adminImg = document.createElement('img');
      const adminId = document.createElement('span');
      const adminName = document.createElement('span');
      const adminBtn = document.createElement('button');

      adminImg.src = data[i].img;
      adminImg.style.width = '60px';
      adminId.innerText = data[i].userId;
      adminName.innerText = data[i].info;
      adminBtn.innerText = '삭제';

      adminList.appendChild(adminRow);
      adminRow.appendChild(adminImg);
      adminRow.appendChild(adminId);
      adminRow.appendChild(adminName);
      adminRow.appendChild(adminBtn);

      adminBtn.addEventListener('click', () => {
        fetch(url + '/users/' + data[i].userId, {
          method: 'DELETE'
        })
          .then((res) => {
            console.log(data[i].userId + '의 회원 정보는 삭제되었습니다.');
            location.reload();
          })
          .catch((err) => {
            console.error(err);
          })
      })
    }
  })
  .catch((err) => {
    console.error(err);
  })