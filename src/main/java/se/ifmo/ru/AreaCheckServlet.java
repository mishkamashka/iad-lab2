package se.ifmo.ru;

import se.ifmo.ru.model.Point;

import javax.json.*;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringReader;
import java.util.ArrayList;
import java.util.List;

@WebServlet(name = "AreaCheckServlet", urlPatterns = "/areaCheckServlet")
public class AreaCheckServlet extends HttpServlet {

    private ServletConfig config;
    private List<Point> points = null;
    private double x, y, radius = 2;
    private String errorMsg;

    @Override
    public void init(ServletConfig config) throws ServletException {
        this.config = config;
    }

    @Override
    public ServletConfig getServletConfig() {
        return config;
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Content-Type", "text/html; charset=UTF-8");
        String delete = request.getParameter("delete");
        if (delete != null && delete.matches("true")) {
            points.clear();
            response.sendRedirect("/lab7/lab7.jsp");
        } else {
            PrintWriter out = response.getWriter();
            String xString = request.getParameter("x_coord");
            String yString = request.getParameter("y_coord");
            String rString = request.getParameter("rBox");
            boolean doSave = (Integer.parseInt(request.getParameter("doSave")) != 0);


            JsonReader jsonReader = Json.createReader(new StringReader(xString));
            JsonArray x_array = jsonReader.readArray();
            jsonReader = Json.createReader(new StringReader(yString));
            JsonArray y_array = jsonReader.readArray();
            int r = Integer.parseInt(rString);

            JsonArrayBuilder result = Json.createArrayBuilder();

            for (int i = 0; i < x_array.size(); ++i) {
                double x = x_array.getJsonNumber(i).doubleValue();
                double y = y_array.getJsonNumber(i).doubleValue();
                boolean isInArea = checkArea(new Point(x, y, r, false));
                if (doSave)
                    points.add(new Point(x, y, r, isInArea));
                result.add(isInArea);
            }
            JsonArray res = result.build();

            out.println(res);
        }

    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        errorMsg = "";
        config.getServletContext().setAttribute("errorMsg", errorMsg);
        request.setAttribute("errorMsg", errorMsg);

        if (points == null) {
            points = new ArrayList<>();
            config.getServletContext().setAttribute("points", points);
        }
        response.setContentType("text/html");

        if (Integer.valueOf(request.getParameter("doSave")) == 0) {
            if (isRInputValid(request)) {

                //checking all old points with new radius and setting updated values
                for (int i = 0; i < points.size(); i++) {
                    Point p = points.get(i);
                    p.setRadius(radius);
                    if (checkArea(p))
                        p.setInArea(true);
                    else
                        p.setInArea(false);
                    points.set(i, p);
                }
            }

            response.setHeader("Content-Type", "text/html; charset=UTF-8");
            PrintWriter out = response.getWriter();
            JsonArrayBuilder array = Json.createArrayBuilder();

            for (Point point : points) {
                array.add(Json.createObjectBuilder()
                        .add("x", point.getX())
                        .add("y", point.getY())
                        .add("radius", point.getRadius())
                        .add("isInArea", point.isInArea()));
            }

            JsonArray result = array.build();
            out.println(result);

        } else {
            //radius = 3;
            if (radius != 0) {
                if (isXYInputValid(request)) {

                    //adding new point
                    Point currentPoint = new Point(x, y, radius, false);
                    if (checkArea(currentPoint))
                        currentPoint.setInArea(true);
                    points.add(currentPoint);
                } else {
                    errorMsg = "X and Y values are not correct";
                }
            } else {
                errorMsg = "R is not set yet";
            }

            response.setHeader("Content-Type", "text/html; charset=UTF-8");
            PrintWriter out = response.getWriter();
            JsonArrayBuilder array = Json.createArrayBuilder();

            for (Point point : points) {
                array.add(Json.createObjectBuilder()
                        .add("x", point.getX())
                        .add("y", point.getY())
                        .add("radius", point.getRadius())
                        .add("isInArea", point.isInArea()));
            }

            JsonArray result = array.build();
            out.println(result);
        }
    }

    private boolean isXYInputValid(HttpServletRequest request) throws IllegalArgumentException, NumberFormatException {
        try {
            x = Double.valueOf(request.getParameter("coordinate_x"));
            y = Double.valueOf(request.getParameter("coordinate_y"));
        } catch (NumberFormatException e) {
            return false;
        }
        if (x > -3 && x < 5 && y > -3 && y < 3)
            return true;
        else
            return false;
    }

    private boolean isRInputValid(HttpServletRequest request) throws IllegalArgumentException, NumberFormatException {
        try {
            radius = Double.valueOf(request.getParameter("radius"));
        } catch (NumberFormatException e) {
            return false;
        }
        if (radius > 2 && radius < 5)
            return true;
        else
            return false;
    }

    private boolean checkArea(Point point) {
        return (point.getX() >= 0 && point.getX() <= point.getRadius() / 2 && point.getY() >= 0 && point.getY() <= point.getRadius() / 2) ||
                (point.getX() <= 0 && point.getX() >= -point.getRadius() && point.getY() >= 0 && point.getY() <= point.getRadius()) ||
                (point.getX() <= 0 && Math.pow(point.getX(), 2) + Math.pow(point.getY(), 2) <= Math.pow(point.getRadius(), 2) && point.getY() <= 0);
    }
}
