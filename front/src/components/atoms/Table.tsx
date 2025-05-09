import { Table, Button } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Action {
  label?: string;
  element?: ReactNode;
  onClick?: (rowData?: Record<string, unknown>) => void;
}

interface TableObjProps {
  data: Record<string, unknown>[];
  actions?: Action[];
}

export const TableObj = ({ data, actions }: TableObjProps) => {
  const getKeys = () => {
    if (data && data.length > 0) {
      return Object.keys(data[0]);
    }
    return [];
  };

  const headers = getKeys();
  const hasActions = actions && actions.length > 0;

  const renderActionCells = (item: Record<string, unknown>) => {
    if (!actions || actions.length === 0) {
      return null;
    }
    return (
      <Table.Cell key="actions" display="flex" gapX={2}>
        {actions.map((action, index) => {
          if (action.element) {
            return action.element;
          }

          return (
            <Button
              key={index}
              onClick={() => action.onClick && action.onClick(item)}
              size="sm"
              variant="outline"
            >
              {action?.label}
            </Button>
          );
        })}
      </Table.Cell>
    );
  };

  const renderCells = (item: Record<string, unknown>, headerKey: string) => {
    return <Table.Cell key={headerKey}>{String(item[headerKey])}</Table.Cell>;
  };

  const renderRows = (item: Record<string, unknown>, index: number) => {
    return (
      <Table.Row key={index}>
        {headers.map((headerKey) => renderCells(item, headerKey))}
        {hasActions && renderActionCells(item)}
      </Table.Row>
    );
  };

  if (!data || data.length === 0) {
    return <p>Dont have any data to show</p>;
  }

  return (
    <Table.Root variant="outline">
      <Table.Header>
        <Table.Row>
          {headers.map((key) => (
            <Table.ColumnHeader key={key}>{key}</Table.ColumnHeader>
          ))}
          {hasActions && (
            <Table.ColumnHeader key="actions">Actions</Table.ColumnHeader>
          )}
        </Table.Row>
      </Table.Header>
      <Table.Body>{data.map(renderRows)}</Table.Body>
    </Table.Root>
  );
};
