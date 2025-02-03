```markdown
# 🚗 Car Rental Pro

## 📌 Sobre o Projeto
Car Rental Pro é um sistema de gestão completo para locadoras de veículos, desenvolvido com **Angular 18**. O sistema permite o cadastro e gerenciamento de veículos, usuários e aluguéis, além de exibir métricas e estatísticas em um dashboard moderno e responsivo. Ele inclui uma barra de navegação (navbar) e um serviço de navegação para facilitar a troca entre as diferentes seções do sistema.

## 🚀 Tecnologias Utilizadas
- **Angular 18**
- **TypeScript**
- **RxJS**
- **Angular CLI**
- **Bootstrap Icons**
- **JSON Server** (para simulação de backend, opcional)

## 📂 Estrutura do Projeto
A estrutura do projeto foi organizada de forma modular, separando as funcionalidades em **core**, **features** e **shared**. A seguir, uma visão geral dos principais diretórios e suas responsabilidades:

```
/car-rental-pro
│
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── models/
│   │   │   │   ├── vehicle.model.ts         // Interface para um veículo.
│   │   │   │   ├── user.model.ts            // Interface para um usuário.
│   │   │   │   ├── rental-history.model.ts  // Interface para o histórico de aluguéis.
│   │   │   │   ├── dashboard.model.ts       // Interfaces para estatísticas do dashboard (DashboardSummary, ShortVehicle, ShortRental, ActiveRental).
│   │   │   │   └── navigation.model.ts      // Modelos para navegação (ex.: rota, label, ícone).
│   │   │   ├── services/
│   │   │   │   ├── api.service.ts             // Serviço genérico para chamadas HTTP.
│   │   │   │   ├── vehicle-api.service.ts     // Comunicação com a API de veículos.
│   │   │   │   ├── vehicle-state.service.ts   // Gerencia o estado local dos veículos.
│   │   │   │   ├── user-api.service.ts        // Comunicação com a API de usuários.
│   │   │   │   ├── rental-history.service.ts  // Gerencia o histórico de aluguéis.
│   │   │   │   ├── dashboard.service.ts       // Calcula e agrega estatísticas do dashboard.
│   │   │   │   ├── dashboard-facade.service.ts  // Consolida dados dos serviços para o dashboard.
│   │   │   │   └── navigation.service.ts      // Gerencia a navegação e atualiza o estado da navbar.
│   │   ├── features/
│   │   │   ├── navbar/
│   │   │   │   ├── navbar.component.ts        // Componente que exibe a barra de navegação em todas as páginas.
│   │   │   │   └── navbar.component.html      // Template da navbar com links para Dashboard, Veículos, Usuários, Aluguéis, etc.
│   │   │   ├── dashboard/
│   │   │   │   ├── dashboard-page.component.ts     // Componente pai que gerencia a exibição e as métricas do dashboard.
│   │   │   │   ├── dashboard-metrics.component.ts  // Exibe as métricas e estatísticas consolidadas.
│   │   │   ├── vehicles/
│   │   │   │   ├── vehicle-page.component.ts       // Componente pai para a gestão dos veículos.
│   │   │   │   ├── vehicle-list.component.ts       // Exibe a lista de veículos cadastrados.
│   │   │   │   ├── vehicle-card.component.ts       // Exibe os detalhes resumidos de um veículo.
│   │   │   │   ├── vehicle-form.component.ts       // Formulário para criação e edição de veículos.
│   │   │   │   └── vehicle-detail.component.ts     // Exibe detalhes completos de um veículo.
│   │   │   ├── users/
│   │   │   │   ├── user-page.component.ts          // Componente pai para a gestão dos usuários.
│   │   │   │   ├── user-registration.component.ts  // Formulário para registro de usuários.
│   │   │   │   └── user-list.component.ts          // Exibe a lista de usuários cadastrados.
│   │   │   ├── rentals/
│   │   │   │   ├── rental-page.component.ts        // Componente pai para a gestão do histórico de locações.
│   │   │   │   └── rental-history.component.ts     // Exibe o histórico de aluguéis.
│   │   ├── shared/
│   │   │   ├── components/
│   │   │   │   ├── button.component.ts           // Botão reutilizável.
│   │   │   │   ├── table.component.ts            // Tabela reutilizável.
│   │   │   │   └── card.component.ts             // Card reutilizável.
│   │   │   ├── directives/
│   │   │   │   └── focus.directive.ts            // Diretiva para foco automático em inputs.
│   │   │   └── pipes/
│   │   │       ├── format-plate.pipe.ts          // Pipe para formatação de placas.
│   │   │       └── format-phone.pipe.ts          // Pipe para formatação de telefones.
│   │   ├── app.component.ts
│   │   └── app.routes.ts
│   ├── assets/
│   ├── environments/
│   └── main.ts
```

## ⚙️ Pré-requisitos
- **Node.js** (recomendado: v18+)
- **Angular CLI** (versão 18)
- **Git** (opcional)

## 📥 Instalação do Angular CLI
```sh
npm install -g @angular/cli@18
```
Verifique a instalação:
```sh
ng version
```

## 📦 Instalação do Projeto
1. Clone o repositório:
   ```sh
   git clone https://github.com/rafasdiass/car-rental-pro.git
   ```
2. Acesse a pasta do projeto:
   ```sh
   cd car-rental-pro
   ```
3. Instale as dependências:
   ```sh
   npm install
   ```

## ▶️ Executando o Projeto
Inicie o projeto com:
```sh
ng serve
```
Acesse no navegador:
```
http://localhost:4200/
```

## 🔄 Configuração Global de Localidade
Para que as datas e números sejam formatados para o português do Brasil, o projeto registra o locale e define o `LOCALE_ID` globalmente. No `AppModule` (ou na configuração do `ApplicationConfig`), você encontrará:
```ts
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt, 'pt-BR');
...
providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }]
```
Isso faz com que, por padrão, os pipes de data e moeda usem o formato brasileiro.

## 🔧 Simulação de Backend (Opcional)
Para testar o sistema com um backend simulado utilizando **JSON Server**:
1. Instale o JSON Server:
   ```sh
   npm install -g json-server
   ```
2. Crie um arquivo `db.json` na raiz do projeto com o seguinte conteúdo:
   ```json
   {
     "vehicles": [
       {
         "id": "1",
         "plate": "ABC-1234",
         "chassis": "9BWZZZ377VT004251",
         "renavam": "12345678901",
         "model": "HB20",
         "brand": "Hyundai",
         "year": 2019
       },
       {
         "id": "2",
         "plate": "XYZ-9876",
         "chassis": "1HGBH41JXMN109186",
         "renavam": "23456789011",
         "model": "Civic",
         "brand": "Honda",
         "year": 2020
       },
       {
         "id": "3",
         "plate": "DEF-4567",
         "chassis": "1HGCM82633A123456",
         "renavam": "34567890123",
         "model": "Focus",
         "brand": "Ford",
         "year": 2021
       }
     ],
     "users": [
       {
         "id": "1",
         "name": "José da Silva",
         "email": "jose.silva@example.com",
         "phone": "(11) 91234-5678",
         "document": "123.456.789-00",
         "address": "Rua das Acácias, 101 - São Paulo, SP"
       },
       {
         "id": "2",
         "name": "Maria Oliveira",
         "email": "maria.oliveira@example.com",
         "phone": "(21) 99876-5432",
         "document": "987.654.321-00",
         "address": "Av. Paulista, 2000 - São Paulo, SP"
       },
       {
         "id": "3",
         "name": "Carlos Santos",
         "email": "carlos.santos@example.com",
         "phone": "(31) 92345-6789",
         "document": "321.654.987-00",
         "address": "Rua dos Ipês, 50 - Belo Horizonte, MG"
       },
       {
         "id": "4",
         "name": "Ana Souza",
         "email": "ana.souza@example.com",
         "phone": "(41) 94567-1234",
         "document": "654.987.321-00",
         "address": "Rua XV de Novembro, 300 - Curitiba, PR"
       },
       {
         "id": "5",
         "name": "Pedro Lima",
         "email": "pedro.lima@example.com",
         "phone": "(51) 97890-1234",
         "document": "789.123.456-00",
         "address": "Av. Bento Gonçalves, 456 - Porto Alegre, RS"
       }
     ],
     "rentals": [
       {
         "id": "101",
         "userId": "1",
         "vehicleId": "2",
         "startDate": "2025-02-01",
         "endDate": "2025-02-07",
         "totalPrice": 1200,
         "status": "active"
       },
       {
         "id": "102",
         "userId": "2",
         "vehicleId": "3",
         "startDate": "2025-01-15",
         "endDate": "2025-01-22",
         "totalPrice": 950,
         "status": "completed"
       },
       {
         "id": "103",
         "userId": "3",
         "vehicleId": "1",
         "startDate": "2025-02-05",
         "endDate": "2025-02-12",
         "totalPrice": 1300,
         "status": "active"
       },
       {
         "id": "104",
         "userId": "4",
         "vehicleId": "3",
         "startDate": "2025-01-10",
         "endDate": "2025-01-17",
         "totalPrice": 980,
         "status": "completed"
       },
       {
         "id": "105",
         "userId": "5",
         "vehicleId": "2",
         "startDate": "2025-01-20",
         "endDate": "2025-01-27",
         "totalPrice": 1150,
         "status": "canceled"
       }
     ]
   }
   ```
3. Inicie o JSON Server:
   ```sh
   json-server --watch db.json --port 3000
   ```
A API ficará disponível em:
```
http://localhost:3000/
```

## 🔄 Rotas do Sistema
- `/dashboard` → **DashboardPageComponent** – Exibe as métricas e estatísticas consolidadas.
- `/vehicles` → **VehiclePageComponent** – Gerencia os veículos.
- `/vehicles/:id` → **VehicleDetailComponent** – Exibe detalhes de um veículo.
- `/vehicles/new` → **VehicleFormComponent** – Permite a criação de um veículo.
- `/vehicles/edit/:id` → **VehicleFormComponent** – Permite a edição de um veículo.
- `/users` → **UserPageComponent** – Gerencia os usuários.
- `/rentals` → **RentalPageComponent** – Gerencia o histórico de locações.
- `/navbar` → **NavbarComponent** – Exibe a barra de navegação com links para as principais seções do sistema.

## ✅ Testes Unitários
Para executar os testes unitários:
```sh
ng test
```

## 📌 Contribuição
1. Faça um fork do repositório.
2. Crie uma branch para sua feature:
   ```sh
   git checkout -b minha-feature
   ```
3. Commit suas alterações:
   ```sh
   git commit -m 'Minha nova feature'
   ```
4. Faça o push:
   ```sh
   git push origin minha-feature
   ```
5. Crie um Pull Request.

## 📃 Licença
rafasdiasdev@gmail.com

---

### Explicação das Principais Partes

**Core Models:**
- **vehicle.model.ts:** Define a estrutura de dados para um veículo.
- **user.model.ts:** Define a estrutura de dados para um usuário.
- **rental-history.model.ts:** Define o formato do histórico de locações.
- **dashboard.model.ts:** Contém interfaces para as estatísticas do dashboard, como DashboardSummary, ShortVehicle, ShortRental e ActiveRental.
- **navigation.model.ts:** Define modelos para a navegação, como rotas, rótulos e ícones.

**Core Services:**
- **api.service.ts:** Serviço genérico para chamadas HTTP.
- **vehicle-api.service.ts & user-api.service.ts:** Comunicação com as APIs de veículos e usuários, respectivamente.
- **vehicle-state.service.ts:** Gerencia o estado local dos veículos, permitindo reatividade.
- **rental-history.service.ts:** Gerencia o histórico de locações.
- **dashboard.service.ts:** Calcula e agrega estatísticas para o dashboard.
- **dashboard-facade.service.ts:** Consolida os dados dos serviços e fornece dados prontos para o dashboard.
- **navigation.service.ts:** Gerencia a navegação entre módulos e atualiza o estado da navbar.

**Features:**
- **Navbar:**
  - **NavbarComponent:** Exibe a barra de navegação com links para Dashboard, Veículos, Usuários, Aluguéis, etc.
- **Dashboard:**
  - **DashboardPageComponent:** Componente pai que organiza a exibição do dashboard, integrando a navbar e os componentes de métricas.
  - **DashboardMetricsComponent:** Exibe as estatísticas consolidadas (total de veículos, usuários, aluguéis, etc.).
- **Vehicles:**
  - **VehiclePageComponent:** Componente pai para a gestão dos veículos.
  - **VehicleListComponent:** Exibe a lista de veículos cadastrados.
  - **VehicleCardComponent:** Mostra um resumo dos dados de um veículo.
  - **VehicleFormComponent:** Formulário para criação e edição de veículos.
  - **VehicleDetailComponent:** Exibe informações detalhadas de um veículo.
- **Users:**
  - **UserPageComponent:** Componente pai para a gestão dos usuários.
  - **UserRegistrationComponent:** Formulário para registro de novos usuários.
  - **UserListComponent:** Lista os usuários cadastrados.
- **Rentals:**
  - **RentalPageComponent:** Componente pai para a gestão do histórico de locações.
  - **RentalFormComponent:** Exibe o histórico de aluguéis, permitindo consulta e gerenciamento.

**Shared:**
- **Components:** Botões, tabelas e cards reutilizáveis.
- **Directives:** Diretivas como a de foco automático em inputs.
- **Pipes:** Pipes para formatação de placas de veículos e telefones.

**Configuração Global de Localidade:**
- O projeto registra o locale para `pt-BR` e define o `LOCALE_ID` globalmente, garantindo que datas e números sejam formatados para o português do Brasil.

**Navegação:**
- **NavbarComponent** exibe a barra de navegação com links para as principais seções do sistema.
- **NavigationService** gerencia a lógica de navegação (mudança de rotas, atualização do estado da navbar).
```
