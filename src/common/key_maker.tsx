import { CardComponentInterface } from "../interface";

const key_maker = (item: CardComponentInterface) => {`${item.name}${Math.floor(Math.random() * (1 - 10 + 1)) + 1}`}

export default key_maker