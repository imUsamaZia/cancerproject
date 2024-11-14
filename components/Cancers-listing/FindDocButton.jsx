"use client";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  addKeyword
} from "@/features/filter/candidateFilterSlice";
export default function FindDocButton(props) {
    const { title } = props;
  const dispatch = useDispatch();

  const categoryHandler = ({ name }) => {
    dispatch(addKeyword(name));
  };

  return (
    <Link
      onClick={() => categoryHandler({ name: title })}
      href={`/doctors?q=${title}`}
      className="theme-btn btn-style-three custom-btn"
    >
      Find a doctor
    </Link>
  );
}
