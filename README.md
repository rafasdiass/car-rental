```markdown
# 🚗 Car Rental Pro

## 📌 Sobre o Projeto
Car Rental Pro é um sistema de gestão completo para locadoras de veículos, desenvolvido com **Angular 18**. O sistema permite o cadastro e gerenciamento de veículos, usuários e aluguéis, além de exibir métricas e estatísticas em um dashboard moderno e responsivo. Ele também conta com uma barra de navegação (navbar) e um serviço de navegação para facilitar a troca entre as diferentes seções do sistema.

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
│   │   │   │   ├── vehicle.model.ts         // Define a interface para um veículo.
│   │   │   │   ├── user.model.ts            // Define a interface para um usuário.
│   │   │   │   ├── rental-history.model.ts  // Define a interface para o histórico de aluguéis.
│   │   │   │   ├── dashboard.model.ts       // Define interfaces para estatísticas do dashboard (DashboardSummary, ShortVehicle, ShortRental, ActiveRental).
│   │   │   │   └── navigation.model.ts      // Define modelos relacionados à navegação (ex.: rota, label, ícone).
│   │   │   ├── services/
│   │   │   │   ├── api.service.ts             // Serviço genérico para chamadas HTTP.
│   │   │   │   ├── vehicle-api.service.ts     // Comunicação com a API de veículos.
│   │   │   │   ├── vehicle-state.service.ts   // Gerencia o estado local dos veículos.
│   │   │   │   ├── user-api.service.ts        // Comunicação com a API de usuários.
│   │   │   │   ├── rental-history.service.ts  // Serviço para gerenciamento do histórico de aluguéis.
│   │   │   │   ├── dashboard.service.ts       // Serviço para cálculo e agregação de estatísticas do dashboard.
│   │   │   │   ├── dashboard-facade.service.ts  // Facade que consolida dados dos serviços para o dashboard.
│   │   │   │   └── navigation.service.ts      // Serviço responsável pela navegação entre módulos e atualização do estado da navbar.
│   │   ├── features/
│   │   │   ├── navbar/
│   │   │   │   ├── navbar.component.ts        // Componente que exibe a barra de navegação em todas as páginas.
│   │   │   │   └── navbar.component.html      // Template da navbar, com links para Dashboard, Veículos, Usuários, Aluguéis, etc.
│   │   │   ├── dashboard/
│   │   │   │   ├── dashboard-page.component.ts     // Componente pai que gerencia a exibição e as métricas do dashboard.
│   │   │   │   ├── dashboard-metrics.component.ts  // Componente que exibe as métricas e estatísticas consolidadas.
│   │   │   ├── vehicles/
│   │   │   │   ├── vehicle-page.component.ts       // Componente pai para a gestão dos veículos.
│   │   │   │   ├── vehicle-list.component.ts       // Exibe a lista de veículos cadastrados.
│   │   │   │   ├── vehicle-card.component.ts       // Exibe os detalhes resumidos de um veículo.
│   │   │   │   ├── vehicle-form.component.ts       // Formulário para criação e edição de veículos.
│   │   │   │   └── vehicle-detail.component.ts     // Exibição detalhada de um veículo.
│   │   │   ├── users/
│   │   │   │   ├── user-page.component.ts          // Componente pai para a gestão de usuários.
│   │   │   │   ├── user-registration.component.ts  // Formulário de registro de usuários.
│   │   │   │   └── user-list.component.ts          // Lista de usuários cadastrados.
│   │   │   ├── rentals/
│   │   │   │   ├── rental-page.component.ts        // Componente pai para a gestão do histórico de aluguéis.
│   │   │   │   └── rental-history.component.ts     // Exibe o histórico de locações.
│   │   ├── shared/
│   │   │   ├── components/
│   │   │   │   ├── button.component.ts           // Botão reutilizável.
│   │   │   │   ├── table.component.ts            // Tabela reutilizável.
│   │   │   │   └── card.component.ts             // Card reutilizável.
│   │   │   ├── directives/
│   │   │   │   └── focus.directive.ts            // Diretiva para foco automático em inputs.
│   │   │   └── pipes/
│   │   │       ├── format-plate.pipe.ts          // Pipe para formatação de placas de veículos.
│   │   │       └── format-phone.pipe.ts          // Pipe para formatação de números de telefone.
│   │   ├── app.component.ts
│   │   └── app.routes.ts
│   ├── assets/
│   ├── environments/
│   └── main.ts
```

### Funcionalidade dos Principais Componentes e Serviços

- **Navbar (NavbarComponent & NavigationService)**
  - **NavbarComponent**: Exibe a barra de navegação no topo de todas as páginas, com links para Dashboard, Veículos, Usuários, Aluguéis, etc. É responsável por fornecer uma navegação consistente e intuitiva.
  - **NavigationService**: Gerencia a lógica de navegação (por exemplo, atualização do estado da navbar, mudança de rotas) e pode ser injetado em outros componentes para redirecionamento programático.

- **Dashboard (DashboardPageComponent, DashboardMetricsComponent, DashboardFacadeService, DashboardService)**
  - **DashboardPageComponent**: Componente pai que organiza a exibição do dashboard, combinando a navbar, as métricas e outros componentes.
  - **DashboardMetricsComponent**: Exibe as estatísticas consolidadas (total de veículos, usuários e aluguéis) e outras métricas em cards e tabelas.
  - **DashboardService**: Responsável por calcular e agregar dados (por exemplo, total de veículos, últimos veículos cadastrados, aluguéis ativos).
  - **DashboardFacadeService**: Simplifica a interação com os diversos serviços (dashboard, veículo, usuário, histórico de aluguéis) e fornece dados prontos para o dashboard.

- **Vehicles**
  - **VehiclePageComponent**: Atua como componente pai para a gestão dos veículos. Coordena a exibição da lista de veículos, a criação/edição e os detalhes de cada veículo.
  - **VehicleListComponent**: Exibe uma lista de veículos cadastrados.
  - **VehicleCardComponent**: Mostra um resumo dos dados de um veículo, ideal para exibição em grids ou listas.
  - **VehicleFormComponent**: Formulário para criação e edição de veículos.
  - **VehicleDetailComponent**: Exibe informações detalhadas de um veículo selecionado.

- **Users**
  - **UserPageComponent**: Componente pai para a gestão dos usuários.
  - **UserRegistrationComponent**: Formulário para registro de novos usuários.
  - **UserListComponent**: Lista os usuários cadastrados.

- **Rentals**
  - **RentalPageComponent**: Componente pai para a gestão do histórico de aluguéis.
  - **RentalHistoryComponent**: Exibe o histórico de locações, permitindo a consulta e o gerenciamento dos aluguéis.

- **Core Services e Models**
  - **api.service.ts**: Serviço genérico para efetuar chamadas HTTP.
  - **vehicle-api.service.ts** e **user-api.service.ts**: Serviços especializados para comunicação com as respectivas APIs.
  - **vehicle-state.service.ts**: Gerencia o estado local dos veículos, possibilitando reatividade e atualização de dados.
  - **rental-history.service.ts**: Gerencia o histórico de aluguéis.
  - **dashboard.service.ts** e **dashboard-facade.service.ts**: Calculam e agregam dados para o dashboard, facilitando a exibição das métricas.
  - **Models (vehicle.model.ts, user.model.ts, rental-history.model.ts, dashboard.model.ts, navigation.model.ts)**: Definem as interfaces e contratos de dados usados em todo o projeto, garantindo tipagem forte e consistência na comunicação entre os componentes e serviços.

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
   git clone https://github.com/rafasdiass/car-rental
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

## 🔧 Simulação de Backend (Opcional)
Para utilizar um backend simulado com JSON Server:
1. Instale o JSON Server:
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
       { "id": "1", "firstName": "João", "lastName": "Silva", "email": "joao@example.com" }
     ],
     "rentals": [
       { "id": "101", "userId": "1", "vehicleId": "2", "startDate": "2023-09-01", "endDate": "2023-09-07", "status": "active" }
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
```


