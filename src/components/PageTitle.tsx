import React from "react";
import { Typography } from "@mui/material";

export type PageTitleProps = {
  title: string;
};

const PageTitle = React.memo(({ title }: PageTitleProps) => {
  return <Typography variant={"h5"}>{title}</Typography>;
});

export default PageTitle;
