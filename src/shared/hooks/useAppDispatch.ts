import { useDispatch } from 'react-redux';
import { AppDispatch } from "@/app/_store/store";

export const useAppDispatch: () => AppDispatch = useDispatch;