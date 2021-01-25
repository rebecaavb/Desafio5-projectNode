import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    if (!['income', 'outcome'].includes(type)) {
      throw Error(`O tipo '${type}' é inválido!`);
    }

    // if (type !== 'income' && type !== 'outcome') {
    //   throw Error(`O tipo '${type}' é inválido!`);
    // }

    if (
      type === 'outcome' &&
      value > this.transactionsRepository.getBalance().total
    ) {
      throw Error(
        'Não é possível realizar uma transação de saída com valor maior que o total disponível',
      );
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;
