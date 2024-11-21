import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import axios from 'axios';

const app = express();
const port = 3001;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para pasta de arquivos estáticos 'src'
app.use(express.static('src'));
// Middleware para processar dados de formulários
app.use(express.urlencoded({ extended: true }));
// Middleware para receber dados em JSON (ex: AJAX)
app.use(express.json());
// Middleware para cookies
app.use(cookieParser());
// Middleware para arquivos estáticos (opcional)
app.use(express.static(path.join(__dirname, 'public')));

//Rota principal
app.get('/inicio', async (req, res) => {
  res.render('index2');
});

//Rota após logado
app.get('/', async (req, res) => {
  const access_token = req.cookies.access_token;

  const response = await axios.get("http://localhost:3000/users/user", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  
  console.log(response.data)

  res.render('index', { usuario: response.data});
});

//Rota GET para exibir o formulário de cadastro
app.get('/cadastro', async (req, res) => {
  res.render('cadastro');
});

//Rota POST para processar o cadastro
app.post('/cadastro', async (req, res) => {
  const { name, email, password, phone } = req.body;
  console.log("Nome:",name,"Email:",email,"Senha:",password, "Phone:", phone);

  const response = await axios.post("http://localhost:3000/users", {
    name: name,
    email: email,
    password: password,
    gold: 0,
    phone: phone,
    role: "user",
  });
  console.log(response.data)

  console.log("Email PASSANDO:",email);
  const response1 = await axios.post("http://localhost:3000/auth/verifyEmail", {
    email: email,
  },);
  
  console.log("Passou");

  res.cookie('email', email, { httpOnly: true });
  res.cookie('phone', phone, { httpOnly: true });
  

  res.redirect(`/desejaVerificarEmail`);
});

//Rota para escolha do usuario, se ele deseja inserir o segundo email
app.get('/desejaVerificarEmail', async (req, res) => {
  res.render('desejaVerificarEmail');
});

//Rota GET para exibir o formulário de inserção do segundo email
app.get('/verificarSegundoEmail', async (req, res) => {
  res.render('verificarSegundoEmail');
});

//Rota POST para processar o formulário de inserção do segundo email
app.post(`/verificarSegundoEmail`, async (req, res) => {
  const email = req.body.email;
  const firstMail = req.cookies.email;
  const phone = req.cookies.phone;
  console.log("Email:", email, "Primeiro Email:", firstMail);

  if(!email){
    res.send("Você não preencheu email");
  }

  const response = await axios.post("http://localhost:3000/auth/verifySecondEmail", {
    withCredentials: true,
    email: email,
    firstMail: firstMail
  });
  console.log(response.data);
  
  res.redirect(`/desejaVerificarTelefone`);
});

//Rota para escolha do usuario, se ele deseja verificar o telefone inserido
app.get('/desejaVerificarTelefone', async (req, res) => {
  res.render('desejaVerificarTelefone');
});

//Rota que pega os cookies e manda para um "SMS" que irá aparecer no terminal que estiver rodando a api
app.get(`/verificarTelefone`, async (req, res) => {
  
  const email = req.cookies.email;
  const phone = req.cookies.phone;
  console.log("Email:", email, "telefone", phone);
  
  const response = await axios.post("http://localhost:3000/auth/sendSms", {
    email: email,
    phone: phone
  });
  console.log(response.data);
  
  res.redirect(`/codigoTelefone`);
});

//Rota GET para exibir o formulario para o usuario inserir o código
app.get(`/codigoTelefone`, async (req, res) => {
  res.render('codigoTelefone');
});

//Rota POST para processar o formulário da inserção do código
app.post(`/codigoTelefone`, async (req, res) => {
  const email = req.cookies.email;
  const code = req.body.code;
  const response = await axios.post("http://localhost:3000/auth/verifySms", {
    email: email,
    code: code
  });
  
  res.redirect('/login');
});

// Rota GET para exibir o formulário de login
app.get('/login', (req, res) => {
  res.render('login');
});

// Rota POST para processar o login
app.post('/login', async (req, res) => {
  const { email, pass } = req.body;
  console.log("Email:",email,"Senha:",pass);

  const response = await axios.post("http://localhost:3000/auth/login", {
    email: email,
    pass: pass,
  });
  
  const {access_token}= response.data;
  console.log(access_token);

  res.cookie("access_token", access_token, {
    httpOnly: true,
    secure: false,
    maxAge: 24 * 60 * 60 * 1000 // 1 dia em milisegundos
  });

  res.redirect('/');
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
