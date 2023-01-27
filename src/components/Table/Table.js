import styled, { css } from "styled-components";

const TableRow = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 16px;

  min-height: 64px;
  border-bottom: solid lightgrey 1px;
  align-items: center;

  ${({ header }) =>
    header
      ? css`
          position: sticky;
          top: 0;
          left: 0;
        `
      : ""};

  * {
    flex: 1;
    font-weight: ${({ header }) => (header ? 600 : 500)};
  }
`;

export default function Table({ schema, data }) {
  const keys = Object.keys(schema);

  return (
    <div>
      <TableRow header={true}>
        {keys.map((key) => {
          return (
            <span key={`TableHeaderKey-${key}`}>
              {schema[key].label ?? key}
            </span>
          );
        })}
      </TableRow>
      {data.map((dItem) => {
        return (
          <TableRow>
            {keys.map((key, index) => {
              if (schema[key]?.mapper)
                return (
                  <span key={`TableItem-${index}-${key}`}>
                    {schema[key]?.mapper(dItem)}
                  </span>
                );
              return (
                <span key={`TableItem-${index}-${key}`}>{dItem?.[key]}</span>
              );
            })}
          </TableRow>
        );
      })}
    </div>
  );
}
