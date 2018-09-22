package se.ifmo.ru.model;

public class Point {

    private final double x;
    private final double y;
    private boolean isInArea;
    private int radius;

    public Point(double x, double y, int radius, boolean isInArea) {
        this.x = x;
        this.y = y;
        this.isInArea = isInArea;
        this.radius = radius;
    }

    public double getX() {
        return x;
    }

    public double getY() {
        return y;
    }

    public boolean isInArea() {
        return isInArea;
    }

    public void setInArea(boolean inArea) {
        isInArea = inArea;
    }

    public int getRadius() {
        return radius;
    }

    public void setRadius(int radius) {
        this.radius = radius;
    }
}
