-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 20/03/2025 às 00:56
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
(1, 'Morango', 'Primeira', 'Sim', 10, 5.00),
(9, 'Banana', 'Primeira', 'Sim', 10, 12.00),
(10, 'Abacaxi', 'Primeira', 'Sim', 10, 8.00),
(11, 'Maracujá', 'Primeira', 'Sim', 8, 4.00),
(12, 'Laranja', 'Primeira', 'Sim', 5, 2.50),
(13, 'Abacate', 'Primeira', 'Sim', 5, 4.00),
(14, 'Cajá', 'Primeira', 'Sim', 8, 7.00);

-- --------------------------------------------------------

--
-- Estrutura para tabela `itensvenda`
--

CREATE TABLE `itensvenda` (
  `id` int(11) NOT NULL,
  `venda_id` int(11) NOT NULL,
  `fruta_id` int(11) NOT NULL,
  `quantidade` int(11) NOT NULL,
  `preco_unitario` float NOT NULL,
  `desconto` float DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `itensvenda`
--

INSERT INTO `itensvenda` (`id`, `venda_id`, `fruta_id`, `quantidade`, `preco_unitario`, `desconto`) VALUES
(2, 2, 13, 3, 7, 10),
(3, 3, 13, 4, 7, 15),
(4, 4, 14, 2, 7, 10),
(13, 13, 13, 5, 4, 20),
(14, 14, 12, 5, 2.5, 15),
(15, 15, 11, 2, 4, 25);

-- --------------------------------------------------------

--
-- Estrutura para tabela `itensvendas`
--

CREATE TABLE `itensvendas` (
  `id` int(11) NOT NULL,
  `venda_id` int(11) NOT NULL,
  `fruta_id` int(11) NOT NULL,
  `quantidade` int(11) NOT NULL,
  `preco_unitario` float NOT NULL,
  `desconto` float DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `itensvendas`
--

INSERT INTO `itensvendas` (`id`, `venda_id`, `fruta_id`, `quantidade`, `preco_unitario`, `desconto`) VALUES
(1, 13, 10, 2, 15, 10),
(2, 14, 10, 1, 15, 10),
(3, 15, 9, 2, 10, 10),
(4, 16, 9, 1, 10, 5),
(5, 17, 12, 5, 7, 10),
(6, 18, 12, 5, 7, 10);

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
(2, 'Vendedor - Gildevan', 'Gil@email.com', 'root', 'Vendedor'),
(7, 'Vendedor - Wollney', 'vdn@email.com', '$2b$10$nDaH.hV4fcq3QqqZBGuaXuky/A/xidAol437sSpbsY/L8z9.3RLXa', 'Vendedor'),
(8, 'Administrador', 'adm@email.com', '$2b$10$QdNuEuR9WcH3XFQtZ9hOL.wBF8SeQ8JHMGeVTDfVBZtOW40OppPKq', 'Administrador'),
(9, 'Vendedor - Joaquim', 'buiu@email.com', '$2b$10$n7ahowZcuVztz4EJwzJGlOHkGSA0fBZylJWjdDkBxWyDsI7K1zIIq', 'Vendedor'),
(10, 'Vendedor - Jolivan', 'jo@email.com', '$2b$10$e5IpNLmBRUkkqAmN.4bDX.8aDDgf2RrMa2VDzD.3tHTaySfoNzJxe', 'Vendedor');

-- --------------------------------------------------------

--
-- Estrutura para tabela `venda`
--

CREATE TABLE `venda` (
  `id` int(11) NOT NULL,
  `vendedor_id` int(11) NOT NULL,
  `valor_total` float NOT NULL,
  `data_hora` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `venda`
--

INSERT INTO `venda` (`id`, `vendedor_id`, `valor_total`, `data_hora`) VALUES
(2, 7, 18.9, '2025-03-19 22:30:29'),
(3, 9, 23.8, '2025-03-19 22:53:47'),
(4, 7, 12.6, '2025-03-19 23:09:34'),
(13, 10, 16, '2025-03-19 23:43:30'),
(14, 9, 10.625, '2025-03-19 23:44:55'),
(15, 7, 6, '2025-03-19 23:50:25');

-- --------------------------------------------------------

--
-- Estrutura para tabela `vendas`
--

CREATE TABLE `vendas` (
  `id` int(11) NOT NULL,
  `vendedor_id` int(11) NOT NULL,
  `data_hora` timestamp NOT NULL DEFAULT current_timestamp(),
  `valor_total` decimal(10,2) NOT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `vendas`
--

INSERT INTO `vendas` (`id`, `vendedor_id`, `data_hora`, `valor_total`, `createdAt`, `updatedAt`) VALUES
(2, 1, '2025-03-18 04:02:34', 200.00, '2025-03-18 21:14:18', '2025-03-18 21:14:18'),
(3, 2, '2025-03-18 04:06:05', 200.00, '2025-03-18 21:14:18', '2025-03-18 21:14:18'),
(4, 2, '2025-03-18 04:58:48', 340.00, '2025-03-18 21:14:18', '2025-03-18 21:14:18'),
(13, 9, '2025-03-19 18:35:20', 18.00, '2025-03-19 18:35:20', '2025-03-19 18:35:20'),
(14, 9, '2025-03-19 18:35:42', 13.50, '2025-03-19 18:35:42', '2025-03-19 18:35:42'),
(15, 9, '2025-03-19 19:54:57', 18.00, '2025-03-19 19:54:57', '2025-03-19 19:54:57'),
(16, 7, '2025-03-19 21:07:04', 9.50, '2025-03-19 21:07:04', '2025-03-19 21:07:04'),
(17, 7, '2025-03-19 21:39:29', 31.50, '2025-03-19 21:39:29', '2025-03-19 21:39:29'),
(18, 7, '2025-03-19 21:39:29', 31.50, '2025-03-19 21:39:29', '2025-03-19 21:39:29');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `frutas`
--
ALTER TABLE `frutas`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `itensvenda`
--
ALTER TABLE `itensvenda`
  ADD PRIMARY KEY (`id`),
  ADD KEY `venda_id` (`venda_id`),
  ADD KEY `fruta_id` (`fruta_id`);

--
-- Índices de tabela `itensvendas`
--
ALTER TABLE `itensvendas`
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
-- Índices de tabela `venda`
--
ALTER TABLE `venda`
  ADD PRIMARY KEY (`id`),
  ADD KEY `vendedor_id` (`vendedor_id`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de tabela `itensvenda`
--
ALTER TABLE `itensvenda`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de tabela `itensvendas`
--
ALTER TABLE `itensvendas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de tabela `venda`
--
ALTER TABLE `venda`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de tabela `vendas`
--
ALTER TABLE `vendas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `itensvenda`
--
ALTER TABLE `itensvenda`
  ADD CONSTRAINT `itensvenda_ibfk_1` FOREIGN KEY (`venda_id`) REFERENCES `vendas` (`id`),
  ADD CONSTRAINT `itensvenda_ibfk_2` FOREIGN KEY (`fruta_id`) REFERENCES `frutas` (`id`);

--
-- Restrições para tabelas `itensvendas`
--
ALTER TABLE `itensvendas`
  ADD CONSTRAINT `itensvendas_ibfk_1` FOREIGN KEY (`venda_id`) REFERENCES `vendas` (`id`),
  ADD CONSTRAINT `itensvendas_ibfk_2` FOREIGN KEY (`fruta_id`) REFERENCES `frutas` (`id`);

--
-- Restrições para tabelas `venda`
--
ALTER TABLE `venda`
  ADD CONSTRAINT `venda_ibfk_1` FOREIGN KEY (`vendedor_id`) REFERENCES `usuarios` (`id`);

--
-- Restrições para tabelas `vendas`
--
ALTER TABLE `vendas`
  ADD CONSTRAINT `vendas_ibfk_1` FOREIGN KEY (`vendedor_id`) REFERENCES `usuarios` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
