import { useEffect } from "react";

interface WelcomeProps<T, K> {
  data: T;
  test: K;
}

const Welcome = <T, K>({ data, test }: WelcomeProps<T, K>) => {
  useEffect(() => {
    console.log(typeof data);
    console.log(typeof test);
  }, []);

  return <div>Welcome</div>;
};

export default Welcome;
