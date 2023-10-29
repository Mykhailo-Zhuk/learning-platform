'use client';

import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

type Correct = { correct: { [key: string]: string } };

const CorrectAnswers = ({ correct }: Correct) => {
  const { toast } = useToast();
  const content = Object.values(correct);

  return (
    <Button
      size="lg"
      className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
      onClick={() => {
        toast({
          title: 'Правильні відповіді:',
          description: (
            <div className="flex flex-col">
              {content.length === 0 ? (
                <p>Виберіть хоча б один варіант відповіді</p>
              ) : (
                content?.map((result, index) => {
                  return <p key={index}>{`${index + 1}: ${result}`}</p>;
                })
              )}
            </div>
          ),
        });
      }}>
      Show Results
    </Button>
  );
};

export default CorrectAnswers;
