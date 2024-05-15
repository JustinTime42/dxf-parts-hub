import React, { useState } from "react";
import Button from './Button';
import LoadingDots from "../LoadingDots";

interface Props {
  asyncAction: () => Promise<any>;
  label: string;
  style?: React.CSSProperties | undefined;
  size?: "sm" | "lg" | undefined;
  disabled?: boolean;
}

const AsyncActionButton = ({
  asyncAction,
  label,
  style = undefined,
  size = undefined,
  disabled = false,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    asyncAction()
      .then(() => {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 1300);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Button
        style={style}
        onClick={handleClick}
        disabled={loading || disabled}
      >
        {label}
        {loading && (
          <LoadingDots />
        )}
      </Button>
    </>
  );
};

export default AsyncActionButton;
