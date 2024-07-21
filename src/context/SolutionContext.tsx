import React, { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { GET_SOLUTIONS_URL } from "../apis/apiUrls";
import { getUserId } from "../utils/decodedToken";

// Define the shape of your context data
interface SolutionsContextType {
  emotionalSolutions: any[];
  mentalSolutions: any[];
  physicalSolutions: any[];
  relationsSolutions: any[];
  loading: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  error: Error | null;
}

// Define the initial context value
const initialContext: SolutionsContextType = {
  emotionalSolutions: [],
  mentalSolutions: [],
  physicalSolutions: [],
  relationsSolutions: [],
  loading: true,
  setRefresh: () => {},
  error: null,
};

const SolutionsContext = createContext<SolutionsContextType>(initialContext);

interface SolutionsProviderProps {
  children: ReactNode;
}

// Provider component
export const SolutionsProvider: React.FC<SolutionsProviderProps> = ({
  children,
}) => {
  const [emotionalSolutions, setEmotionalSolutions] = useState<any[]>([]);
  const [mentalSolutions, setMentalSolutions] = useState<any[]>([]);
  const [physicalSolutions, setPhysicalSolutions] = useState<any[]>([]);
  const [relationsSolutions, setRelationsSolutions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const token = localStorage.getItem("token") || "";
  const id = getUserId(token);

  useEffect(() => {
    const fetchSolutions = async () => {
      try {
        const response = await axios.get(`${GET_SOLUTIONS_URL}/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { Emotional, Mental, Physical, Relations } = response.data.data;

        setEmotionalSolutions(Emotional);
        setMentalSolutions(Mental);
        setPhysicalSolutions(Physical);
        setRelationsSolutions(Relations);
        setLoading(false);
      } catch (err) {
        setError(err as Error);
        setLoading(false);
      }
    };

    fetchSolutions();
  }, [refresh]);

  return (
    <SolutionsContext.Provider
      value={{
        emotionalSolutions,
        mentalSolutions,
        physicalSolutions,
        relationsSolutions,
        loading,
        setRefresh,
        error,
      }}
    >
      {children}
    </SolutionsContext.Provider>
  );
};

export default SolutionsContext;
