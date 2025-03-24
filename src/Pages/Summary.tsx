interface SummayProps<T extends object, K extends keyof T> {
  data: T;
  property: K;
}

const Summary = <T extends object, K extends keyof T>({
  data,
  property,
}: SummayProps<T, K>) => {
  const value = data[property] as string;
  return (
    <div className="">
      {typeof property === "string" ? (
        <p>
          {property} : ({value})
        </p>
      ) : (
        ""
      )}
    </div>
  );
};

export default Summary;
