"use client";

import Link from "next/link";
import { BookOpen, Bookmark, Skull, UserCheck, Users } from "lucide-react";

import { Particles } from "@/components/magicui/particles";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Character } from "@/lib/types";

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
          <div className="absolute inset-0 bg-black">
            <Particles
              className="absolute inset-0 z-0"
              quantity={100}
              staticity={20}
              color={character.isVillain ? "#ef4444" : "#3b82f6"}
              size={0.8}
            />
          </div>
          
          {/* Overlay */}
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/30">
            <div className="relative mb-4 w-28 h-28">
              <Avatar className="w-full h-full border-4 border-background">
                <AvatarImage src={character.imageUrl} alt={character.name} className="object-cover"/>
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
            <h1 className="mb-2 font-display text-4xl font-bold text-white">{character.name}</h1>
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
                <CardTitle className="text-sm font-medium text-muted-foreground">Primeira aparição</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold">{character.firstAppearance}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total de obras</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold">{character.books.length}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Relações</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold">{character.relationships.length}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Fonte</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold">{character.sourceUrl ? "Arquivo brasileiro" : "Catálogo local"}</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
      
      {character.sourceUrl ? (
        <p className="text-sm text-muted-foreground">
          Texto do{" "}
          <a href={character.sourceUrl} target="_blank" rel="noreferrer" className="underline-offset-4 hover:underline">
            arquivo brasileiro
          </a>
          .
        </p>
      ) : null}

      {character.traits.length || character.books.length || character.relationships.length ? (
      <Tabs defaultValue={character.traits.length ? "traits" : character.books.length ? "books" : "relationships"} className="space-y-4">
        <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1">
          {character.traits.length > 0 ? (
            <TabsTrigger value="traits" className="py-3">
              <Bookmark className="w-4 h-4 mr-2" />
              Traços
            </TabsTrigger>
          ) : null}
          {character.books.length > 0 ? (
            <TabsTrigger value="books" className="py-3">
              <BookOpen className="w-4 h-4 mr-2" />
              Obras
            </TabsTrigger>
          ) : null}
          {character.relationships.length > 0 ? (
            <TabsTrigger value="relationships" className="py-3">
              <Users className="w-4 h-4 mr-2" />
              Relações
            </TabsTrigger>
          ) : null}
        </TabsList>
        
        <TabsContent value="traits" className="p-6 border rounded-lg">
          <h3 className="mb-4 text-xl font-semibold">Características e traços</h3>
          <div className="flex flex-wrap gap-2">
            {character.traits.map((trait, index) => (
              <Badge key={index} variant="secondary" className="text-base py-1.5 px-3">
                {trait}
              </Badge>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="books" className="p-6 border rounded-lg">
          <h3 className="mb-4 text-xl font-semibold">Aparições em obras</h3>
          <div className="space-y-4">
            {character.books.map((book, index) => {
              const title = book.href ? (
                <Link href={book.href} className="underline-offset-4 hover:underline">
                  {book.bookTitle}
                </Link>
              ) : (
                book.bookTitle
              );

              return (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>{title}</CardTitle>
                    <Badge variant={book.significance === 'Major' || book.significance === 'Principal' ? 'default' : 'outline'}>
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
              );
            })}
          </div>
        </TabsContent>
        
        <TabsContent value="relationships" className="p-6 border rounded-lg">
          <h3 className="mb-4 text-xl font-semibold">Relações</h3>
          <div className="space-y-4">
            {character.relationships.map((relationship, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>{relationship.characterName}</CardTitle>
                    <Badge 
                      variant={relationship.relationshipType === 'Enemy' || relationship.relationshipType === 'Inimigo' ? 'destructive' : 'default'}
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
      </Tabs>
      ) : null}
    </div>
  );
} 