// React
import { useState } from "react";

// Icons
import avatar from "./icons/avatar.svg";
import frame from "./icons/Frame.svg";

// Styles
import * as S from "./GestantesTable.styles";

// Models
import { GestantesTableProps } from "./models";

// Assets
import trash from "assets/icons/trash.svg";
import remember from "assets/icons/remember.svg";
import moment from "moment";

const GestantesTable = ({
  data,
  columns,
  selectedItems,
  OpenModal,
  setSelectedItems,
  handleCheckboxChange,
  handleDeleteItemConfirmation,
}: GestantesTableProps) => {
  const [deleteButtonIndex, setDeleteButtonIndex] = useState<number | null>(
    null
  );

  const handleIsOpen = (index: number) => {
    setDeleteButtonIndex(deleteButtonIndex === index ? null : index);
  };

  const handleOpenModal = (index: number) => {
    const itemId = data[index].gestationId;
    OpenModal({ index, itemId });
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
                  <img src={avatar} alt={`User ${item.name}`} />
                  {item.name}
                </div>
              </td>
              <td>{item.email}</td>
              <td>
                {item.ddp !== null && item.ddp !== "" ? (
                  <span>{moment(item.ddp).format("DD/MM/YYYY")}</span>
                ) : (
                  <span>N/A</span>
                )}
              </td>
              <td>{item.telefone}</td>
              <td>{item.obstetraResponsavel}</td>
              <td>{item.monitoramentos}</td>
              <td>{item.ultimaAtividade}</td>
              <td>
                {deleteButtonIndex === index && (
                  <span>
                    <button onClick={() => handleDeleteItemConfirmation(index)}>
                      <img src={trash} alt="delete" />
                      <p>Deletar</p>
                    </button>
                    <button onClick={() => handleOpenModal(index)}>
                      <img src={remember} alt="remember" />
                      <p>Criar lembrete</p>
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

export default GestantesTable;
