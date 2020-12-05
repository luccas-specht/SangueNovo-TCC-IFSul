RF -> Requisitos Funcionais.

RNF -> Requisitos Não Funcionais.

RN -> Regras de Negócio.

# Recuperação de senha:

**RF**

- O usuário deve poder recuperar sua senha informando o seu e-mail.
- O usuário deve receber um e-mail com instruções de recuperação de senha.
- O usuário deve poder resetar sua senha.

**RNF**

- ultilizara Mailtrap para testar envios em ambiente de desenvolvimento.
- Utilizar Amazon SES para envios em ambiente de produção.
- O Envio de e-mail deve acontecer em segundo plano (background job).

**RN**

- O link enviado por e-mail para resetar a senhe, deve expirar em no máximo, 2 horas.
- O usuário precisa confirmar a nova senha ao resetar a sua senha.

# Atualização de Perfil:

**RF**

- O usuário deve poder atualizar os campos: nome, senha e foto de perfil.

**RN**

- Para Atualizar a senha, o usuário deve informar a sua senha antiga.
- Para Atualizar a senha, o usuário precisa confirmar a sunha senha.

# Agendamento de serviços:

**RF**

- O usuário deve poder listar todos os prestadores de serviço cadastrados.
- O usuário deve poder listar os dias de um mês com pelo menos um hoario disponível de um prestador.
- O usuário deve poder listar horários disponíveis em um dia específico de um prestador.
- O usuário deve poder realizar um novo agendamento com um prestador.

**RNF**

- O usuário deve poder atualizar os campos: nome, senha e foto de perfil.

**RN**

- Os agendamentos devem estar disponíveis entre 8h às 18h (Primeiro às 8h, último às 17h);
- O usuário não pode agendar em um horário que já passou;
- O usuário não pode agendar serviços consigo mesmo;
- Cada agendamento deve durar 1h exatamente;
- O usuário não pode agendar em um horário já ocupado;amentos devem estar disponíveis entre 8h às 18h (primeiro às 8h, último às 17h).

# Recuperação de senha:

**RF**

- O usuário deve poder listar seus agendamentos de um dia específico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas;

  **RNF**

- Os agendamentos do prestador no dia devem ser armazenados em cache;
- As notificações do prestador devem ser armazenadas no MongoDB;
- As notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io;

**RN**

- A notificação deve ter um status de lida ou não-lida para que o prestador possa controlar;
