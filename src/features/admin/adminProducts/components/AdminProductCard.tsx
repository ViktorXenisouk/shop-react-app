type Props = {
    id:string;
    name:string;
    discription:string;
    imgUrl:string;
}

const AdminProductsCard = ({id,name,discription,imgUrl}:Props) => {

    return (
      <div>
        <p>{name}</p>
        <p>{discription}</p>
        <button>edit</button>
      </div>
    )
  }
  
  export default AdminProductsCard