import pg from 'pg';
import promptSync from 'prompt-sync';

const { Client } = pg;
const prompt = promptSync();

const client = new Client({
    host:     'localhost', 
    port:     5432,         
    user:     'postgres',  
    password: 'root',      
    database: 'estoque_db' 
});

async function listarProdutos() {

    try {

        await client.connect();

        const resultado = await client.query(
            'SELECT * FROM produtos ORDER BY nome, categoria'
        );

        console.log('\n╔════════════════════════════════════════════════════╗');
        console.log('║         ⚗️  LOJA DE LIMPEZA ELIELZINHO LINDINHO      ║');
        console.log('╚════════════════════════════════════════════════════╝\n');

        if (resultado.rows.length === 0) {
            console.log('A loja está vazia no momento.');
        } else {
            resultado.rows.forEach(produtos => {
                console.log(`[${produtos.id}] ${produtos.nome}`);
                console.log(`    Tipo: ${produtos.categoria} | Preço: R$ ${produtos.preco} | Estoque: ${produtos.quantidade}`);
                console.log('    ─────────────────────────────────────────');
            });
            console.log(`\nTotal de produtos: ${resultado.rows.length}`);
        }

    } catch (erro) {

        console.log('❌ Erro ao listar produtos:', erro.message);

    } finally {

        await client.end();

    }
}

// Chamar função listarProdutos() caso queira ver os produtos

async function cadastrarProduto() {

    try {

        await client.connect();

        console.log('\n⚗️  CADASTRAR NOVO PRODUTO\n');

        const nome      = prompt('Nome do produto: ');
        const categoria      = prompt('Categoria: ');
        const preco     = prompt('Preço: ');
        const quantidade = prompt('Quantidade Inicial: ');

        if (!nome || !categoria || !preco) {
            console.log('❌ Nome, categoria e preço são obrigatórios.');
            return; 
        }

        if (preco < 0){
            console.log('❌ O preço NÃO pode ser negativo.');
            return;
        }

        const resultado = await client.query(
            `INSERT INTO produtos (nome, categoria, preco, quantidade)
             VALUES ($1, $2, $3, $4)
             RETURNING *`,
            [nome, categoria, preco, quantidade]
        );

        console.log('\n✅ Item cadastrado com sucesso!');
        console.log(`   ID gerado pelo banco: ${resultado.rows[0].id}`);
        console.log(`   ${resultado.rows[0].nome} adicionado à loja.`);

    } catch (erro) {

        console.log('❌ Erro ao cadastrar produto:', erro.message);

    } finally {

        await client.end();

    }
}

// Chamar função cadastrarProduto() caso queira cadastrar um produto novo.

async function cadastrarProduto() {

    try {

        await client.connect();

        console.log('\n⚗️  CADASTRAR NOVO PRODUTO\n');

        const data_inicial      = prompt('Nome do produto: ');

        if (!nome || !categoria || !preco) {
            console.log('❌ Nome, categoria e preço são obrigatórios.');
            return; 
        }

        const resultado = await client.query(
            `INSERT INTO produtos (nome, categoria, preco, quantidade)
             VALUES ($1, $2, $3, $4)
             RETURNING *`,
            [nome, categoria, preco, quantidade]
        );

        console.log('\n✅ Item cadastrado com sucesso!');
        console.log(`   ID gerado pelo banco: ${resultado.rows[0].id}`);
        console.log(`   ${resultado.rows[0].nome} adicionado à loja.`);

    } catch (erro) {

        console.log('❌ Erro ao cadastrar produto:', erro.message);

    } finally {

        await client.end();

    }
}
