import React, {useState, useEffect, ChangeEvent} from "react";
import { useHistory } from "react-router-dom";
import User from "../../models/User";
import {cadastroUsuario} from "../../services/Service";
import { Grid, Box, Typography, TextField, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import "./CadastroUser.css";

function CadastroUser() {

    let history = useHistory();
    const [confirmarSenha, setConfirmarSenha] = useState<String>("")
    const [user, setUser] = useState<User>(
        {
            id: 0,
            nome: "",
            apelido: "",
            usuario: "",
            senha: ""
        })

    const [userResult, setUserResult] = useState<User>(
        {
            id: 0,
            nome: "",
            apelido: "",
            usuario: "",
            senha: ""
        })

    useEffect(() => {
        if (userResult.id != 0) {
            history.push("/logar")
            console.log(userResult)
        }
    }, [userResult])

    function confirmarSenhaHandle(e: ChangeEvent<HTMLInputElement>) {
        setConfirmarSenha(e.target.value)
    }

    function updatedModel(e: ChangeEvent<HTMLInputElement>) {

        setUser({
            ...user,
            [e.target.name]: e.target.value
        })

    }
    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        if (confirmarSenha == user.senha) {
            cadastroUsuario(`/usuarios/cadastrar`, user, setUserResult)
            alert("Usuário Cadastrado com Sucesso!!")
        } else {
            alert("Dados Inconsistentes!! Verifique as Informações de Cadastro.")
        }
    }

    return (
        <Grid container direction="row" justifyContent="center" alignItems="center">
            <Grid item xs={6} className="bgImageCadastro"></Grid>
            <Grid item xs={6} alignItems="center">
                <Box paddingX={10}>
                    <form onSubmit={onSubmit}>
                        <Typography variant="h4" gutterBottom color="textPrimary" component="h3" align="center">Cadastrar</Typography>
                        <TextField value={user.nome} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id="nome" label="Nome" variant="outlined" name="nome" margin="normal" fullWidth />
                        <TextField value={user.apelido} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id="apelido" label="Apelido" variant="outlined" name="apelido" margin="normal" fullWidth />
                        <TextField value={user.usuario} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id="usuario" label="Usuário" variant="outlined" name="usuario" margin="normal"fullWidth />
                        <TextField value={user.senha} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id="senha" label="Senha" variant="outlined" name="senha" margin="normal" type="password" fullWidth />
                        <TextField value={confirmarSenha} onChange={(e: ChangeEvent<HTMLInputElement>) => confirmarSenhaHandle(e)} id="confirmarSenha" label="Confirmar a Senha" variant="outlined" name="confirmarSenha" margin="normal" type="password" fullWidth />
                        <Box marginTop={2} textAlign="center">
                            <Link to="/logar" className="text-decorator-none">
                                <Button variant="contained" color="secondary" className="bgColorUser">
                                    Cancelar
                                </Button>
                            </Link>
                            <Button type="submit" variant="contained" color="primary" className="backgroundColor">
                                    Cadastrar
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Grid>

        </Grid>
    );
}

export default CadastroUser;