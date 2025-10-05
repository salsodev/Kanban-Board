import { MdOutlineSpaceDashboard } from "react-icons/md";
import { useSelector } from "react-redux";

function ListItem({ payload, handleDeleteCategory, handleAddCurrentCategory }) {
  const currProject = useSelector(
    (state) => state.entities?.ui?.currentCategory
  );

  return (
    <li
      className="category_list_item"
      style={{
        backgroundColor:
          currProject?.id === payload?.id
            ? "var(--clr-bg-main)"
            : "transparent",
        color:
          currProject?.id === payload?.id
            ? "var(--clr-primary-blue)"
            : "inherit",
        borderRadius:
          currProject?.id === payload?.id ? "0 100px 100px 0" : "0px",
      }}
      onClick={() => handleAddCurrentCategory(payload)}
      onDoubleClick={() => handleDeleteCategory(payload.id)}
    >
      <MdOutlineSpaceDashboard />
      <span>{payload?.name}</span>
    </li>
  );
}

export default ListItem;
