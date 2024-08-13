import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Paw } from 'lucide-react';

const fetchCatFact = async () => {
  const response = await fetch('https://catfact.ninja/fact');
  if (!response.ok) {
    throw new Error('Failed to fetch cat fact');
  }
  return response.json();
};

const CatFactCard = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['catFact'],
    queryFn: fetchCatFact,
  });

  if (isLoading) return <Skeleton className="h-[100px] w-full" />;
  if (error) return <p>Error loading cat fact</p>;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Paw className="mr-2 h-4 w-4" />
          Cat Fact
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>{data.fact}</p>
      </CardContent>
    </Card>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-purple-800">All About Cats</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Fascinating Felines</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Cats are one of the most popular pets in the world. They're known for their independence, playfulness, and affectionate nature.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Cat Breeds</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {['Siamese', 'Persian', 'Maine Coon', 'Bengal', 'Sphynx', 'British Shorthair'].map((breed) => (
                  <Badge key={breed} variant="secondary">{breed}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="mb-8">
          <img 
            src="https://placekitten.com/800/400" 
            alt="Adorable kitten" 
            className="w-full h-64 object-cover rounded-lg shadow-lg mx-auto"
          />
        </div>
        
        <CatFactCard />
      </div>
    </div>
  );
};

export default Index;