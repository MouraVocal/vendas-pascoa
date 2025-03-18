export interface Status {
  id: string;
  status_name: string;
}

export const getStatusTranslation = (status: string): string => {
  console.log(status);
  const translations: { [key: string]: string } = {
    created: 'Criado',
    in_preparation: 'Em preparação',
    waiting_for_retreat: 'Aguardando retirada',
    finished: 'Finalizado',
  };
  return translations[status] || status;
};
