"use client";

import { Character } from '@/lib/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BookOpen, Quote, Users, Bookmark, Skull, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Particles } from '@/components/magicui/particles';

interface CharacterProfileProps {
  character: Character;
}

export function CharacterProfile({ character }: CharacterProfileProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="space-y-8">
      <Card className="border-0 shadow-none">
        <div className="relative h-64 overflow-hidden rounded-t-lg">
          {/* Background particles */}
          <div className="absolute inset-0 bg-black">
            <Particles
              className="absolute inset-0 z-0"
              quantity={100}
              staticity={20}
              color={character.isVillain ? '#ef4444' : '#3b82f6'}
              size={0.8}
            />
          </div>
          
          {/* Overlay */}
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/30">
            <div className="relative mb-4 w-28 h-28">
              <Avatar className="w-full h-full border-4 border-background">
                <AvatarImage src={character.imageUrl} alt={character.name} />
                <AvatarFallback className="text-3xl bg-primary/10">
                  {getInitials(character.name)}
                </AvatarFallback>
              </Avatar>
              <div className="absolute bottom-0 right-0 flex items-center justify-center w-10 h-10 rounded-full bg-background">
                {character.isVillain ? (
                  <Skull className="w-6 h-6 text-red-500" />
                ) : (
                  <UserCheck className="w-6 h-6 text-blue-500" />
                )}
              </div>
            </div>
            <h1 className="mb-2 text-3xl font-bold text-white">{character.name}</h1>
            <Badge variant={character.isVillain ? "destructive" : "default"}>
              {character.isVillain ? 'Vilão' : 'Herói'}
            </Badge>
          </div>
        </div>
        
        <CardHeader className="px-6">
          <CardDescription className="text-base">
            {character.description}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Primeira Aparição</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold">{character.firstAppearance}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total de Obras</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold">{character.books.length}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Relacionamentos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold">{character.relationships.length}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Citações</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold">{character.quotes.length}</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="traits" className="space-y-4">
        <TabsList className="grid w-full h-auto grid-cols-1 sm:grid-cols-4">
          <TabsTrigger value="traits" className="py-3">
            <Bookmark className="w-4 h-4 mr-2" />
            Características
          </TabsTrigger>
          <TabsTrigger value="books" className="py-3">
            <BookOpen className="w-4 h-4 mr-2" />
            Obras
          </TabsTrigger>
          <TabsTrigger value="relationships" className="py-3">
            <Users className="w-4 h-4 mr-2" />
            Relacionamentos
          </TabsTrigger>
          <TabsTrigger value="quotes" className="py-3">
            <Quote className="w-4 h-4 mr-2" />
            Citações
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="traits" className="p-6 border rounded-lg">
          <h3 className="mb-4 text-xl font-semibold">Características e Traços</h3>
          <div className="flex flex-wrap gap-2">
            {character.traits.map((trait, index) => (
              <Badge key={index} variant="secondary" className="text-base py-1.5 px-3">
                {trait}
              </Badge>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="books" className="p-6 border rounded-lg">
          <h3 className="mb-4 text-xl font-semibold">Aparições em Livros</h3>
          <div className="space-y-4">
            {character.books.map((book, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>{book.bookTitle}</CardTitle>
                    <Badge variant={book.significance === 'Major' ? 'default' : 'outline'}>
                      {book.significance}
                    </Badge>
                  </div>
                  <CardDescription>Papel: {book.role}</CardDescription>
                </CardHeader>
                {book.notes && (
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{book.notes}</p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="relationships" className="p-6 border rounded-lg">
          <h3 className="mb-4 text-xl font-semibold">Relacionamentos</h3>
          <div className="space-y-4">
            {character.relationships.map((relationship, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>{relationship.characterName}</CardTitle>
                    <Badge 
                      variant={relationship.relationshipType === 'Enemy' ? 'destructive' : 'default'}
                    >
                      {relationship.relationshipType}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{relationship.description}</p>
                </CardContent>
                <div className="p-4 pt-0 text-right">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/characters/${relationship.characterId}`}>
                      Ver perfil
                    </Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="quotes" className="p-6 border rounded-lg">
          <h3 className="mb-4 text-xl font-semibold">Citações Memoráveis</h3>
          <div className="space-y-4">
            {character.quotes.map((quote, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <div className="flex items-center">
                    <Quote className="w-5 h-5 mr-2 text-muted-foreground" />
                    <CardTitle className="text-lg italic">"{quote.text}"</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{quote.book}</Badge>
                    {quote.context && (
                      <p className="text-sm text-muted-foreground">{quote.context}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 