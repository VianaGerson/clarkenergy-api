Este projeto é uma Single Page Application (SPA) desenvolvida para que empresas consultem e comparem fornecedores de energia (GD e Mercado Livre) com base no seu consumo e localização (UF).

## 🚀 Tecnologias Utilizadas

### Backend
* **Node.js v22 (LTS)**: Utilizando as últimas funcionalidades de performance e segurança.
* **NestJS v11**: Framework modular para uma arquitetura escalável e tipada.
* **Jest**: Para testes unitários da lógica de negócio.
* **TypeScript**: Garantindo integridade de dados em toda a aplicação.

### Frontend
* **React + Vite**: Setup moderno para uma experiência de desenvolvimento rápida e build otimizado.
* **Tailwind CSS**: Estilização responsiva e suporte nativo a Dark Mode.
* **Lucide React**: Biblioteca de ícones leves.
* **Axios**: Cliente HTTP para consumo da API.

### Infraestrutura
* **Docker & Docker Compose**: Containerização completa para garantir que o projeto rode identicamente em qualquer máquina.

---

## 🛠️ Arquitetura e Decisões Técnicas

1.  **Cálculo de Economia**: Toda a lógica de cálculo foi centralizada no Backend (`EconomyService`). Isso garante que as regras de negócio (tarifas por estado e descontos por fornecedor) sejam processadas de forma segura e possam ser reutilizadas por outros clientes (Mobile, por exemplo).
2.  **Modularidade no NestJS**: O projeto foi dividido no módulo `Economy`, seguindo o padrão Controller-Service. Isso facilita a manutenção e a criação de novos recursos.
3.  **UI/UX**: O frontend foi projetado para ser intuitivo. O usuário informa apenas dois dados e recebe um feedback visual imediato através de cards comparativos, com destaque para a economia real em Reais e porcentagem.
4.  **Resiliência**: Implementado tratamento de erros para estados (UF) não atendidos e validação de dados de entrada.

---

## 📦 Como Rodar o Projeto

Você precisará ter o **Docker** e o **Docker Compose** instalados em sua máquina.

1.  **Clone o repositório:**
    ```bash
    git clone <link-do-seu-repositorio>
    cd <nome-da-pasta>
    ```

2.  **Suba os containers:**
    ```bash
    docker-compose up --build
    ```

3.  **Acesse as aplicações:**
    * **Frontend:** [http://localhost:5173](http://localhost:5173)
    * **Backend (API):** [http://localhost:3000](http://localhost:3000)

---

## 🧪 Testes Automatizados

Para rodar os testes unitários do backend (lógica de cálculo):

```bash
cd backend
npm run test