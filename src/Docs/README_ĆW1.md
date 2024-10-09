# Dokumentacja ćwiczenia 1

## Spis treści
- [ShapeController](#shapecontroller)
- [ShapeView](#shapeview)
- [ShapeModel](#shapemodel)
- [App](#app)

## ShapeController

`ShapeController` to kontroler, który zarządza logiką rysowania i interakcji z kształtami. Używa stanu React do przechowywania informacji o aktualnych kształtach, narzędziach rysunkowych i statusie rysowania.

## ShapeView

`ShapeView` to komponent, który odpowiada za renderowanie kształtów na płótnie oraz interfejsu użytkownika. Odbiera dane z kontrolera i wizualizuje je na ekranie.

## ShapeModel

`ShapeModel` to model danych, który przechowuje informacje o kształtach, ich właściwościach (np. kolorze, rozmiarze) oraz metodach do manipulacji nimi.

## App

`App` to główny komponent aplikacji, który łączy wszystkie elementy projektu. Inicjalizuje kontroler, widok i model oraz obsługuje główne przepływy danych.

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