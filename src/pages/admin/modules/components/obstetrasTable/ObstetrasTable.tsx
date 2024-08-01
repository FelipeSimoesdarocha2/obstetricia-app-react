// React
import { useState } from "react";

// Icons
import avatar from "./icons/avatar.svg";
import frame from "./icons/Frame.svg";

// Styles
import * as S from "./ObstetrasTable.styles";

// Models
import { ObstetrasTableProps } from "./models";

// Assets
import trash from "assets/icons/trash.svg";

const ObstetrasTable = ({
  data,
  columns,
  selectedItems,
  setSelectedItems,
  handleCheckboxChange,
  handleDeleteItemConfirmation,
}: ObstetrasTableProps) => {
  const [deleteButtonIndex, setDeleteButtonIndex] = useState<number | null>(
    null
  );

  const handleIsOpen = (index: number) => {
    setDeleteButtonIndex(deleteButtonIndex === index ? null : index);
  };

  return (
    <S.Component>
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectedItems.length === data.length}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedItems(data.map((_, index) => index));
                  } else {
                    setSelectedItems([]);
                  }
                }}
              />
            </th>
            {columns.map((item) => (
              <th key={item.title}>{item.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedItems.includes(index)}
                  onChange={(e) => handleCheckboxChange(e, index)}
                />
              </td>
              <td>
                <div>
                  <img
                    src={item.perfilImage ? item.perfilImage : avatar}
                    alt={""}
                  />
                  {item.name}
                </div>
              </td>
              <td>{item.numerosDeGestantes}</td>
              <td>{item.email}</td>
              <td>{item.telefone}</td>
              <td>{item.crm}</td>
              <td>{item.dataDaCriacao}</td>
              <td>{item.ultimaAtividade}</td>
              <td>
                {deleteButtonIndex === index && (
                  <span>
                    <button onClick={() => handleDeleteItemConfirmation(index)}>
                      <img src={trash} alt="delete" />
                      <p>Deletar</p>
                    </button>
                  </span>
                )}
                <button onClick={() => handleIsOpen(index)}>
                  <img src={frame} alt="image" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </S.Component>
  );
};

export default ObstetrasTable;
