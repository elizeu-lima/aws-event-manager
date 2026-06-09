# AWS Event Manager

Projeto de estudo e portfólio desenvolvido para aprofundar conhecimentos em arquitetura Serverless na AWS, utilizando Infrastructure as Code (IaC) com AWS SAM.

## Objetivo

O AWS Event Manager é uma API Serverless para gerenciamento de eventos.

O projeto tem como objetivo simular um cenário real de desenvolvimento em nuvem, utilizando serviços gerenciados da AWS e boas práticas de arquitetura moderna.

Ao final do projeto, será possível:

* Criar eventos
* Listar eventos
* Consultar eventos por ID
* Atualizar eventos
* Remover eventos
* Monitorar logs e métricas
* Automatizar deploys utilizando Infrastructure as Code

---

# Arquitetura

```text
Client
   |
   v
API Gateway
   |
   v
AWS Lambda
   |
   v
Amazon DynamoDB
   |
   v
CloudWatch Logs
```

---

# Tecnologias Utilizadas

## Cloud

* AWS Lambda
* Amazon API Gateway
* Amazon DynamoDB
* AWS IAM
* AWS CloudFormation
* AWS CloudWatch
* AWS SAM

## Backend

* Node.js 24.x
* JavaScript ES Modules (.mjs)

## DevOps

* Git
* GitHub
* Docker
* AWS CLI
* AWS SAM CLI

## Ambiente de Desenvolvimento

* Windows 11
* WSL2 (Ubuntu 24.04)
* Visual Studio Code

---

# Estrutura do Projeto

```text
aws-event-manager/
│
├── docs/
│   └── architecture.md
│
├── diagrams/
│
├── infrastructure/
│
├── src/
│
└── event-manager-api/
    │
    ├── src/
    │   └── handlers/
    │       ├── create-event.mjs
    │       ├── get-events.mjs
    │       └── get-by-id.mjs
    │
    ├── template.yaml
    ├── package.json
    └── samconfig.toml
```

---

# Recursos AWS Utilizados

## AWS Lambda

Funções responsáveis pelo processamento das requisições da API.

### Endpoints atuais

| Método | Endpoint     | Descrição            |
| ------ | ------------ | -------------------- |
| POST   | /events      | Criar evento         |
| GET    | /events      | Listar eventos       |
| GET    | /events/{id} | Buscar evento por ID |

---

## Amazon DynamoDB

Tabela utilizada para armazenamento dos eventos.

### Estrutura atual

```json
{
  "eventId": "evt-001",
  "title": "AWS Event Manager",
  "description": "Primeiro evento real do projeto",
  "location": "Curitiba",
  "date": "2026-06-20",
  "createdAt": "2026-06-09T00:04:16.638Z"
}
```

---

## Amazon API Gateway

Responsável pela exposição pública da API REST.

Exemplo:

```text
https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/Prod/
```

---

## CloudWatch

Utilizado para:

* Logs de execução
* Troubleshooting
* Monitoramento das funções Lambda

---

# Comandos Utilizados

## Build

```bash
sam build
```

## Deploy

```bash
sam deploy
```

## Deploy guiado

```bash
sam deploy --guided
```

## Validar template

```bash
sam validate
```

## Visualizar logs

```bash
sam logs --stack-name event-manager-api-dev --tail
```

## Remover infraestrutura

```bash
sam delete
```

---

# Ambiente AWS Configurado

## Segurança

* MFA habilitado
* Usuário IAM dedicado para desenvolvimento
* Chaves de acesso configuradas para AWS CLI

## Controle de Custos

* AWS Budget configurado
* Alertas de gastos habilitados
* Ambiente focado no uso do AWS Free Tier

---

# Roadmap

## Concluído

* [x] Conta AWS criada
* [x] MFA configurado
* [x] AWS CLI configurado
* [x] AWS SAM configurado
* [x] Docker configurado no WSL
* [x] Repositório GitHub criado
* [x] Deploy inicial realizado
* [x] DynamoDB integrado
* [x] Endpoint POST /events
* [x] Endpoint GET /events
* [x] Endpoint GET /events/{id}

## Próximas etapas

* [ ] PUT /events/{id}
* [ ] DELETE /events/{id}
* [ ] Validação de payload
* [ ] Tratamento de erros
* [ ] Testes automatizados
* [ ] CI/CD com GitHub Actions
* [ ] Autenticação com Amazon Cognito
* [ ] Frontend com Next.js
* [ ] Observabilidade avançada
* [ ] Deploy de ambiente produtivo

---

# Autor

Elizeu Lima

Projeto desenvolvido para estudo, prática e construção de portfólio em AWS Cloud, Serverless Architecture e DevOps.
