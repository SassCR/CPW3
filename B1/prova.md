# JWT
Json web token> header> cabeçalho > Payload > Sigmature
''''''
# BOLA/IDOR
Objeto> id/UUID - URL
''''''
#  BFLA
Function{Admin}
''''''
PASTA RAIZ > os comandos bases é na pasta raiz.
    > SRC =Codigo
        >DATABASE
        >middleware
        >controllers = Regra de negocio
        >Routes
        >Server.js
    .even(GITIGNORE)

# USER 1
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzcl8xIiwibm9tZSI6IkpvYW8iLCJyb2xlIjoiVVNFUiJ9.pyvf0h5ia7JBue3xWkwBl-xDqmZHcM3xmGLCuebEE64
# USER 2
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzcl8yIiwibm9tZSI6Ik1hcmlhIiwicm9sZSI6IlVTRVIifQ.MEwxtziXIVwTMFNiwdPmSGusnakKCGX2F3e78cK0nuE
# admin
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzcl9hZG1pbiIsIm5vbWUiOiJNaWxlbmEiLCJyb2xlIjoiQURNSU4ifQ.8wi56z9g8zxZD7heTbXwp5TSTpvPRyCq5_b5KeLrDlg

O que vai cair na prova METODOS HTTP
C=Post 
R=Get
U=PUT
D=DELETE
codigos HTTP
200 = OK
203 = Post criado
500 = ERRO do servidor
404 = não encontrado
-Nome da api-METODO('/ROTA')
ex app.get('/nome da rota', req, res)
res.send("Sucesso!) sempre tem que responder algo

Um objeto em Json 
[
    "nome": "Amanda",
    "idade": 40
]Se tenho um json e quero muda para txt tenho que usar o json.parse() json.stringfiler()
Se eu quero criar um texto fs writefile> sempre que usamos ele, ele sobreescreve o arquivo.
fs appendfile() para sobreescrever
para deleta fs unlink()
filter> retorna +3 objetos
find > retorna 1 objeto

Parte teorica