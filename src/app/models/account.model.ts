export interface AccountDetails {
  accountId:                string;
  accountOperationsDTOList:        AccountOperationDTOs[];
  balance:                  number;
  currentPage:              number;
  pageSize:                 number;
  totalPages:               number;
}

export interface AccountOperationDTOs {
  id:            number;
  operationDate: Date;
  amount:        number;
  type:          string;
}
