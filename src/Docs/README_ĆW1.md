# Dokumentacja ćwiczenia 1

## Spis treści
- [ShapeController](#shapecontroller)
- [ShapeView](#shapeview)
- [ShapeModel](#shapemodel)
- [App](#app)

## ShapeController

### Opis
`ShapeController` to kontroler, który zarządza logiką rysowania i interakcji z kształtami. Używa stanu React do przechowywania informacji o aktualnych kształtach, narzędziach rysunkowych i statusie rysowania.

### Funkcje
- **useShapeController**: Hook, który zarządza stanem i logiką rysowania.

## ShapeView

### Opis
`ShapeView` to komponent, który odpowiada za renderowanie kształtów na płótnie oraz interfejsu użytkownika. Odbiera dane z kontrolera i wizualizuje je na ekranie.

### Funkcje
- **renderShapes**: Metoda, która iteruje po aktualnych kształtach i rysuje je na płótnie.
- **handleMouseEvents**: Obsługuje zdarzenia myszy, takie jak kliknięcia i przeciągnięcia, umożliwiając użytkownikowi interakcję z kształtami.
- **updateTool**: Zmienia aktualne narzędzie rysunkowe na podstawie wyboru użytkownika.

## ShapeModel

### Opis
`ShapeModel` to model danych, który przechowuje informacje o kształtach, ich właściwościach (np. kolorze, rozmiarze) oraz metodach do manipulacji nimi.

### Funkcje
- **addShape**: Dodaje nowy kształt do modelu.
- **removeShape**: Usuwa kształt na podstawie jego identyfikatora.
- **updateShape**: Aktualizuje właściwości istniejącego kształtu.

## App

### Opis
`App` to główny komponent aplikacji, który łączy wszystkie elementy projektu. Inicjalizuje kontroler, widok i model oraz obsługuje główne przepływy danych.

### Funkcje
- **initialize**: Inicjalizuje wszystkie komponenty oraz ustawia początkowy stan aplikacji.
- **render**: Renderuje główny interfejs użytkownika oraz przekazuje odpowiednie dane do `ShapeView`.
- **handleGlobalEvents**: Obsługuje zdarzenia na poziomie aplikacji, takie jak zmiany w konfiguracji narzędzi.

## Funkcjonalności aplikacji

### Tworzenie kształtów
- **Tworzenie trójkątów, czworokątów i elips**: Umożliwia użytkownikowi tworzenie podstawowych kształtów na płótnie. Użytkownik może rysować kształty, które następnie można przesuwać i skalować.

### Przesuwanie i skalowanie
- **Przesuwanie aktualnie rysowanej figury**: Użytkownik może kliknąć i przeciągnąć rysowany kształt w inne miejsce na płótnie.
- **Skalowanie aktualnie rysowanej figury**: Umożliwia zmianę rozmiaru rysowanego kształtu przez przycisk scroll na myszce.

### Rysowanie linii
- **Rysowanie prostych linii**: Umożliwia rysowanie prostych linii pomiędzy wybranymi punktami na płótnie.

### Rysowanie odręczne
- **Rysowanie odręczne**: Użytkownik może rysować swobodnie, korzystając z pędzla.

### Zapisywanie obrazu
- **Zapisywanie powstałego obrazu**: Umożliwia zapisanie całego rysunku jako plik graficzny (np. PNG).

### Pisanie tekstu
- **Pisanie tekstu na canvas**: Użytkownik może dodawać tekst na płótnie.