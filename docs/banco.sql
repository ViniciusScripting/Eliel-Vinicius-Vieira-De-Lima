CREATE TABLE produtos (
    id_produto         SERIAL PRIMARY KEY,
    nome       VARCHAR(50) NOT NULL,
    categoria  VARCHAR(50) NOT NULL,
    preco      DECIMAL(10,2) NOT NULL,
    quantidade INTEGER DEFAULT 0
);

CREATE TABLE entrada (
	
	id_entrada		    SERIAL PRIMARY KEY,
	data_inicial DATE
);

CREATE TABLE saida (
	id_saida	SERIAL PRIMARY KEY,
	data_final DATE
)

INSERT INTO produtos (nome, categoria, preco, quantidade) VALUES
    ('Vassoura', 'Insumo', 35.99, 25),
    ('Sabonete', 'Insumo', 20.00, 30),
    ('Escova de dente', 'Insumo', 7.50, 15),
    ('Papel Higiênico', 'Insumo', 10.00, 40),
    ('Algodão', 'Material', 10.00, 10);

SELECT * FROM produtos;