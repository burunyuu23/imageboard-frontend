import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "@/app/_store/store";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;