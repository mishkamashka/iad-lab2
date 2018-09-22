package se.ifmo.ru;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class AreaCheckServlet extends HttpServlet {

    private double x, y, radius;

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.doPost(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        if (isInputValid(request)) {

        }
    }

    private boolean isInputValid(HttpServletRequest request) throws IllegalArgumentException, NumberFormatException {
        x = Double.valueOf(request.getParameter("x_coordinate"));
        y = Double.valueOf(request.getParameter("y_coordinate"));
        radius = Double.valueOf(request.getParameter("radius"));
        if (x > -3 && x < 5 && y > -3 && y < 3 && radius > 2 && radius < 5)
            return true;
        else
            throw new IllegalArgumentException("Значения параметров выходят за диапазон");
    }

    private boolean checkArea() {
        return (x >= 0 && x <= radius/2 && y >= 0 && y <= radius/2) || (x <= 0 && x >= -radius && y >= 0 && y <= radius) ||
                (x <= 0 && Math.pow(x, 2) + Math.pow(y, 2) <= Math.pow(radius, 2) && y <= 0);
    }
}
