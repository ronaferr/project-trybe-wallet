const SAVE_CURRENCIES = 'SAVE_CURRENCIES';
const SAVE_EXPENSE = 'SAVE_EXPENSE';
const saveCurrencies = (currencies) => ({ type: SAVE_CURRENCIES, currencies });
export const saveExpense = (expense) => ({ type: SAVE_EXPENSE, expense });

export function fetchCurrencies() {
  return async (dispatch) => {
    const apiCurrencies = await fetch('https://economia.awesomeapi.com.br/json/all');
    const resultCurrencies = await apiCurrencies.json();
    delete resultCurrencies.USDT; // como deletar propriedades de um objeto https://www.horadecodar.com.br/2020/12/11/remover-propriedade-de-objeto-javascript/
    const currencies = Object.keys(resultCurrencies);
    dispatch(saveCurrencies(currencies));
  };
}
