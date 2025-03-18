-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 18/03/2025 às 05:21
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `venda_frutas`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `frutas`
--

CREATE TABLE `frutas` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `classificacao` enum('Extra','Primeira','Segunda','Terceira') NOT NULL,
  `fresca` enum('Sim','Não') NOT NULL,
  `quantidade` int(11) NOT NULL,
  `valor` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `frutas`
--

INSERT INTO `frutas` (`id`, `nome`, `classificacao`, `fresca`, `quantidade`, `valor`) VALUES
(1, 'Morango', 'Primeira', 'Sim', 1, 1.00);

-- --------------------------------------------------------

--
-- Estrutura para tabela `itens_venda`
--

CREATE TABLE `itens_venda` (
  `id` int(11) NOT NULL,
  `venda_id` int(11) NOT NULL,
  `fruta_id` int(11) NOT NULL,
  `quantidade` int(11) NOT NULL,
  `preco_unitario` decimal(10,2) NOT NULL,
  `desconto` decimal(5,2) DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `perfil` enum('Administrador','Vendedor') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `usuarios`
--

INSERT INTO `usuarios` (`id`, `nome`, `email`, `senha`, `perfil`) VALUES
(1, 'Admin Teste', 'admin@email.com', 'admin', 'Administrador'),
(2, 'Vendendor Teste', 'vendedor@email.com', '134', 'Vendedor');

-- --------------------------------------------------------

--
-- Estrutura para tabela `vendas`
--

CREATE TABLE `vendas` (
  `id` int(11) NOT NULL,
  `vendedor_id` int(11) NOT NULL,
  `data_hora` timestamp NOT NULL DEFAULT current_timestamp(),
  `valor_total` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `vendas`
--

INSERT INTO `vendas` (`id`, `vendedor_id`, `data_hora`, `valor_total`) VALUES
(1, 1, '2025-03-18 03:50:00', 150.00),
(2, 1, '2025-03-18 04:02:34', 200.00),
(3, 2, '2025-03-18 04:06:05', 200.00);

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `frutas`
--
ALTER TABLE `frutas`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `itens_venda`
--
ALTER TABLE `itens_venda`
  ADD PRIMARY KEY (`id`),
  ADD KEY `venda_id` (`venda_id`),
  ADD KEY `fruta_id` (`fruta_id`);

--
-- Índices de tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Índices de tabela `vendas`
--
ALTER TABLE `vendas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `vendedor_id` (`vendedor_id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `frutas`
--
ALTER TABLE `frutas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `itens_venda`
--
ALTER TABLE `itens_venda`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `vendas`
--
ALTER TABLE `vendas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `itens_venda`
--
ALTER TABLE `itens_venda`
  ADD CONSTRAINT `itens_venda_ibfk_1` FOREIGN KEY (`venda_id`) REFERENCES `vendas` (`id`),
  ADD CONSTRAINT `itens_venda_ibfk_2` FOREIGN KEY (`fruta_id`) REFERENCES `frutas` (`id`);

--
-- Restrições para tabelas `vendas`
--
ALTER TABLE `vendas`
  ADD CONSTRAINT `vendas_ibfk_1` FOREIGN KEY (`vendedor_id`) REFERENCES `usuarios` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
