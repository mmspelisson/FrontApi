import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import db from './database/db.js';

const saltRounds = 10;
const app = express();

app.use(express.json());
app.use(cors());

// Registrar Usuarios
app.post("/register", (req, res) => {
  const { email, senha, nomeCompleto, setor, liberacoes, contato, cidadeUF } = req.body;
  console.log("Recebido:", req.body);

  if (!email || !senha || !nomeCompleto || !setor || !liberacoes || !contato || !cidadeUF) {
    return res.status(400).send({ msg: "Todos os campos são obrigatórios" });
  }

  // Verifica se o email já ta cadastrado
  db.query("SELECT * FROM usuarios WHERE email = ?", [email], (err, result) => {
    if (err) {
      console.error("Erro ao consultar o banco:", err);
      return res.status(500).send(err);
    }

    if (result.length === 0) {
      bcrypt.hash(senha, saltRounds, (err, hash) => {
        if (err) {
          console.error("Erro ao hashear a senha:", err);
          return res.status(500).send(err);
        }

        db.query(
          "INSERT INTO usuarios (nomeCompleto, email, senha, setor, liberacoes, contato, cidadeUF) VALUES (?, ?, ?, ?, ?, ?, ?)",
          [nomeCompleto, email, hash, setor, liberacoes, contato, cidadeUF],
          (error, response) => {
            if (error) {
              console.error("Erro ao inserir usuário no banco:", error);
              return res.status(500).send(error);
            }
            res.send({ msg: "Usuário cadastrado com sucesso" });
          }
        );
      });
    } else {
      res.status(400).send({ msg: "Email já cadastrado" });
    }
  });
});

// Fazer login
app.post("/login", (req, res) => {
  const { email, senha } = req.body;
  console.log("Tentativa de login:", req.body);
  if (!email || !senha) {
    return res.status(400).send({ msg: "Email e senha são obrigatórios" });
  }

  db.query("SELECT * FROM usuarios WHERE email = ?", [email], (err, result) => {
    if (err) {
      console.error("Erro ao consultar o banco:", err);
      return res.status(500).send({ msg: "Erro ao consultar o banco de dados" });
    }

    if (result.length > 0) {
      const user = result[0];
      bcrypt.compare(senha, user.senha, (error, response) => {
        if (error) {
          console.error("Erro ao comparar senha:", error);
          return res.status(500).send({ msg: "Erro ao verificar senha" });
        }
        console.log("Resultado da comparação de senhas:", response);
        if (response) {
          console.log("Usuário logado com sucesso:", user);
          res.send({ msg: "Usuário logado", user });
        } else {
          console.log("Senha incorreta para o usuário:", email);
          res.status(400).send({ msg: "Senha incorreta" });
        }
      });
    } else {
      console.log("Usuário não encontrado:", email);
      res.status(400).send({ msg: "Usuário não registrado!" });
    }
  });
});

// Mostrar os usuarios no GRID
app.get('/users', (req, res) => {
  db.query("SELECT * FROM usuarios", (err, result) => {
    if (err) {
      console.error('Erro ao buscar usuários:', err);
      res.status(500).send(err);
    } else {
      res.status(200).send(result);
    }
  });
});

// recebe todos os setores
app.get('/setor', (req, res) => {
  const query = 'SELECT * FROM setor';
  db.query(query, (err, result) => {
    if (err) {
      console.error('Erro ao buscar setor', err);
      res.status(500).send(err);
    } else {
      res.status(200).send(result);
    }
  });
});

// Cadastro de setor
app.post("/registerSetor", (req, res) => {
  const { nome } = req.body;
  if (!nome) {
    return res.status(400).send({ msg: "Nome do setor é obrigatório" });
  }
  db.query(
    "INSERT INTO setor (setor) VALUES (?)",
    [nome],
    (error, result) => {
      if (error) {
        console.error("Erro ao inserir setor no banco:", error);
        return res.status(500).send(error);
      }
      console.log("Setor cadastrado com sucesso");
      res.send({ msg: "Setor cadastrado com sucesso" });
    }
  );
});

// ter o proximo ID disponivel
app.get('/lastId', (req, res) => {
  const query = 'SELECT MAX(id) AS lastId FROM usuarios';
  db.query(query, (err, result) => {
    if (err) {
      console.error('Erro ao obter último ID:', err);
      return res.status(500).send(err);
    }
    let lastId = 0;
    if (result.length > 0 && result[0].lastId !== null) {
      lastId = result[0].lastId;
    }
    const nextId = lastId + 1;
    res.json({ lastId, nextId });
  });
});

//cadastrar demanda
app.post("/demanda", (req, res) => {
  const { tipo, descricao, prioridade, solicitante } = req.body;
  if (!tipo || !descricao || !prioridade || !solicitante) {
    return res.status(400).send({ msg: "Tipo, Descrição, Prioridade e Solicitante são obrigatórios" });
  }
  
  db.query(
    "INSERT INTO demanda (tipo, descricao, prioridade, solicitante) VALUES (?, ?, ?, ?)",
    [tipo, descricao, prioridade, solicitante],
    (error, result) => {
      if (error) {
        console.error("Erro ao inserir demanda no banco:", error);
        return res.status(500).send(error);
      }
      console.log("Demanda cadastrada com sucesso");
      res.send({ msg: "Demanda cadastrada com sucesso" });
    }
  );
});

app.get("/demanda", (req, res) => {
  db.query("SELECT * FROM demanda", (error, result) => {
    if (error) {
      console.error("Erro ao buscar demandas:", error);
      return res.status(500).send(error);
    }
    res.send(result);
  });
});

// próximo ID disponível para demanda
app.get('/lastDemandId', (req, res) => {
  const query = 'SELECT MAX(id) AS lastId FROM demanda';
  db.query(query, (err, result) => {
    if (err) {
      console.error('Erro ao obter último ID de demanda:', err);
      return res.status(500).send(err);
    }
    let lastId = 0;
    if (result.length > 0 && result[0].lastId !== null) {
      lastId = result[0].lastId;
    }
    const nextId = lastId + 1;
    res.json({ lastId, nextId });
  });
});

// próximo ID disponível para setor
app.get('/lastSectorId', (req, res) => {
  const query = 'SELECT MAX(id) AS lastId FROM setor';
  db.query(query, (err, result) => {
    if (err) {
      console.error('Erro ao obter último ID de setor:', err);
      return res.status(500).send(err);
    }
    let lastId = 0;
    if (result.length > 0 && result[0].lastId !== null) {
      lastId = result[0].lastId;
    }
    const nextId = lastId + 1;
    res.json({ lastId, nextId });
  });
});

// Editar usuário
app.put("/users/:id", (req, res) => {
  const userId = req.params.id;
  const { email, senha, nomeCompleto, setor, liberacoes, contato, cidadeUF } = req.body;
  if (!email || !nomeCompleto || !setor || !liberacoes || !contato || !cidadeUF) {
    return res.status(400).send({ msg: "Todos os campos são obrigatórios" });
  }
  const updateUser = (hashedSenha) => {
    db.query(
      "UPDATE usuarios SET nomeCompleto = ?, email = ?, senha = ?, setor = ?, liberacoes = ?, contato = ?, cidadeUF = ? WHERE id = ?",
      [nomeCompleto, email, hashedSenha, setor, liberacoes, contato, cidadeUF, userId],
      (error, result) => {
        if (error) {
          console.error("Erro ao atualizar usuário no banco:", error);
          return res.status(500).send(error);
        }
        console.log("Usuário atualizado com sucesso");
        res.send({ msg: "Usuário atualizado com sucesso" });
      }
    );
  };

  if (senha) {
    bcrypt.hash(senha, saltRounds, (err, hash) => {
      if (err) {
        console.error("Erro ao hashear a senha:", err);
        return res.status(500).send(err);
      }
      updateUser(hash);
    });
  } else {
    db.query(
      "UPDATE usuarios SET nomeCompleto = ?, email = ?, setor = ?, liberacoes = ?, contato = ?, cidadeUF = ? WHERE id = ?",
      [nomeCompleto, email, setor, liberacoes, contato, cidadeUF, userId],
      (error, result) => {
        if (error) {
          console.error("Erro ao atualizar usuário no banco:", error);
          return res.status(500).send(error);
        }
        console.log("Usuário atualizado com sucesso");
        res.send({ msg: "Usuário atualizado com sucesso" });
      }
    );
  }
});

// Excluir usuário
app.delete("/users/:id", (req, res) => {
  const userId = req.params.id;

  db.query(
    "DELETE FROM usuarios WHERE id = ?",
    [userId],
    (error, result) => {
      if (error) {
        console.error("Erro ao excluir usuário do banco:", error);
        return res.status(500).send(error);
      }
      console.log("Usuário excluído com sucesso");
      res.send({ msg: "Usuário excluído com sucesso" });
    }
  );
});

// Editar setor
app.put("/updateSetor/:id", (req, res) => {
  const setId = req.params.id;
  const { nome } = req.body;

  if (!nome) {
    return res.status(400).send({ msg: "Nome do setor é obrigatório" });
  }

  // Atualiza o setor no banco
  db.query(
    "UPDATE setor SET setor = ? WHERE id = ?",
    [nome, setId],
    (error, result) => {
      if (error) {
        console.error("Erro ao atualizar setor no banco:", error);
        return res.status(500).send(error);
      }
      console.log("Setor atualizado com sucesso");
      res.send({ msg: "Setor atualizado com sucesso" });
    }
  );
});

// Excluir setor
app.delete("/setor/:id", (req, res) => {
  const setId = req.params.id;

  // Exclui o setor do banco
  db.query(
    "DELETE FROM setor WHERE id = ?",
    [setId],
    (error, result) => {
      if (error) {
        console.error("Erro ao excluir setor do banco:", error);
        return res.status(500).send(error);
      }
      console.log("Setor excluído com sucesso");
      res.send({ msg: "Setor excluído com sucesso" });
    }
  );
});

app.get('/cidade/uf', (req, res) => {
  const idEstado = req.params.idEstado;
  const query = 'SELECT * FROM cidades WHERE ID_Estado = ?';
  db.query(query, [idEstado], (err, result) => {
    if (err) {
      console.error('Erro ao buscar cidades:', err);
      res.status(500).send(err);
    } else {
      res.status(200).send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("Servidor rodando na porta 3001");
});
