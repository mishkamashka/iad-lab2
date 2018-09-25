package se.ifmo.ru.model;

import java.io.Serializable;

public class Point {

    private final double x;
    private final double y;
    private boolean isInArea;
    private double radius;

    public Point(double x, double y, double radius, boolean isInArea) {
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

    public double getRadius() {
        return radius;
    }

    public void setRadius(double radius) {
        this.radius = radius;
    }

    public void updateWithNewRadius() {

    }

    @Override
    public boolean equals(Object obj) {
        if (obj == null || obj.getClass() != this.getClass())
            return false;
        Point p = (Point) obj;
        return (p.getX() == this.getX() && p.getY() == this.getY());
    }
}
