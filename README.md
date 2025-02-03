Aqui está o **README.md atualizado**, incluindo os **componentes pais responsáveis pela renderização e gerenciamento**. 🚀  

---

### 📄 **README.md** (Projeto: Car Rental Pro)

```markdown
# 🚗 Car Rental Pro

## 📌 Sobre o Projeto
Car Rental Pro é um sistema de gestão para locadoras de veículos, desenvolvido com **Angular 18**. O sistema permite **cadastro de veículos, gestão de usuários, histórico de aluguéis e visualização de métricas**.

## 🚀 Tecnologias Utilizadas
- **Angular 18**
- **TypeScript**
- **RxJS**
- **Angular CLI**
- **JSON Server (Simulação de Backend - Opcional)**

---

## ⚙️ **Pré-requisitos**
Antes de começar, você precisará ter instalado:
- **Node.js** (Recomendado: v18+)
- **Angular CLI** (Versão 18)
- **Git** (Opcional)

### 📥 **Instalação do Angular CLI**
Se ainda não possui o Angular CLI instalado, utilize o seguinte comando:

```sh
npm install -g @angular/cli@18
```

Para verificar a instalação:
```sh
ng version
```

---

## 📦 **Instalação do Projeto**
1. **Clone o repositório**
```sh
git clone https://github.com/seu-usuario/car-rental-pro.git
```

2. **Acesse a pasta do projeto**
```sh
cd car-rental-pro
```

3. **Instale as dependências**
```sh
npm install
```

---

## ▶️ **Executando o Projeto**
Após instalar as dependências, execute:

```sh
ng serve
```

Acesse no navegador:
```
http://localhost:4200/
```

---

## 🔧 **Simulação de Backend (Opcional)**
Para testar com um backend falso utilizando **JSON Server**, siga os passos:

1. Instale o **JSON Server**
```sh
npm install -g json-server
```

2. Crie um arquivo `db.json` na raiz do projeto com o seguinte conteúdo:
```json
{
  "vehicles": [
    { "id": "1", "plate": "ABC-1234", "model": "Corolla", "brand": "Toyota", "year": 2022 },
    { "id": "2", "plate": "XYZ-9876", "model": "Civic", "brand": "Honda", "year": 2020 },
    { "id": "3", "plate": "DEF-4567", "model": "Focus", "brand": "Ford", "year": 2021 }
  ],
  "users": [
    { "id": "1", "firstName": "John", "lastName": "Smith", "email": "john@example.com" }
  ]
}
```

3. Inicie o **JSON Server**
```sh
json-server --watch db.json --port 3000
```

A API estará disponível em:
```
http://localhost:3000/vehicles
```

---

## 📂 **Estrutura do Projeto**
```plaintext
/car-rental-pro
│── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── services/
│   │   │   │   ├── api.service.ts            # Serviço genérico para chamadas HTTP
│   │   │   │   ├── vehicle-api.service.ts    # Comunicação com API de veículos
│   │   │   │   ├── vehicle-state.service.ts  # Gerenciamento do estado local de veículos
│   │   │   │   ├── user-api.service.ts       # Comunicação com API de usuários
│   │   │   │   ├── rental-history.service.ts # Serviço de histórico de aluguel
│   │   │   │   ├── dashboard.service.ts      # Serviço para estatísticas e métricas do dashboard
│   │   │   ├── models/
│   │   │   │   ├── vehicle.model.ts         # Interface para definir um veículo
│   │   │   │   ├── user.model.ts            # Interface para definir um usuário
│   │   │   │   ├── rental-history.model.ts  # Interface para definir histórico de aluguel
│   │   ├── features/
│   │   │   ├── dashboard/
│   │   │   │   ├── dashboard-page.component.ts  # PAI - Gerencia dashboard e métricas
│   │   │   │   ├── dashboard-metrics.component.ts # Exibe as métricas do dashboard
│   │   │   ├── vehicles/
│   │   │   │   ├── vehicle-page.component.ts     # PAI - Gerencia todos os veículos
│   │   │   │   ├── vehicle-list.component.ts     # Exibe a lista de veículos cadastrados
│   │   │   │   ├── vehicle-card.component.ts     # Card de veículo disponível para aluguel
│   │   │   │   ├── vehicle-form.component.ts     # Formulário de criação e edição de veículos
│   │   │   │   ├── vehicle-detail.component.ts   # Exibição detalhada de um veículo
│   │   │   ├── users/
│   │   │   │   ├── user-page.component.ts        # PAI - Gerencia usuários e cadastro
│   │   │   │   ├── user-registration.component.ts # Formulário de registro de usuários
│   │   │   │   ├── user-list.component.ts        # Listagem de usuários cadastrados
│   │   │   ├── rentals/
│   │   │   │   ├── rental-page.component.ts      # PAI - Gerencia histórico de locações
│   │   │   │   ├── rental-history.component.ts   # Histórico de aluguéis dos usuários
│   │   ├── shared/
│   │   │   ├── components/
│   │   │   │   ├── button.component.ts           # Botão reutilizável
│   │   │   │   ├── table.component.ts            # Tabela reutilizável
│   │   │   │   ├── card.component.ts             # Card reutilizável
│   │   │   ├── directives/
│   │   │   │   ├── focus.directive.ts            # Diretiva para foco automático em inputs
│   │   │   ├── pipes/
│   │   │   │   ├── format-plate.pipe.ts          # Pipe para formatar placas de veículos
│   │   │   │   ├── format-phone.pipe.ts          # Pipe para formatar números de telefone
│   │   ├── app.component.ts
│   │   ├── app.routes.ts
│   ├── assets/
│   ├── environments/
│   ├── main.ts
```

---

## 🔄 **Rotas do Sistema**
```plaintext
---------------------------------------------------------
|  /dashboard   → DashboardPageComponent                |
|  /vehicles    → VehiclePageComponent                  |
|  /vehicles/:id → VehicleDetailComponent               |
|  /vehicles/new → VehicleFormComponent (criação)      |
|  /vehicles/edit/:id → VehicleFormComponent (edição)  |
|  /users       → UserPageComponent                     |
|  /history     → RentalPageComponent                  |
---------------------------------------------------------
```

---

## ✅ **Testes Unitários**
Rodar testes unitários para garantir a integridade do código:

```sh
ng test
```

---

## 📌 **Contribuição**
1. Fork este repositório.
2. Crie uma nova branch (`git checkout -b minha-feature`).
3. Commit suas alterações (`git commit -m 'Minha nova feature'`).
4. Faça o push (`git push origin minha-feature`).
5. Crie um Pull Request.

---

## 📃 **Licença**
MIT © 2024 - Desenvolvido para **Car Rental Pro** 🚗
```

---

Agora o README **inclui os componentes pais**, responsáveis pelo **gerenciamento das seções do sistema**. 🚀🔥