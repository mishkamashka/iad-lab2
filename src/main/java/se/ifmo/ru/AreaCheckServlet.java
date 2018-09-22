package se.ifmo.ru;

import se.ifmo.ru.model.Point;

import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonArrayBuilder;
import javax.json.JsonReader;
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

@WebServlet(name = "AreaCheckServlet", urlPatterns = "/checking")
public class AreaCheckServlet extends HttpServlet {

    private ServletConfig config;
    private List<Point> list = null;
    private double x, y, radius;
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
        if(list==null) {
            list=new ArrayList<>();
            config.getServletContext().setAttribute("list", list);
        }
        String delete = request.getParameter("delete");
        if (delete != null && delete.matches("true"))
        {
            list.clear();
            response.sendRedirect("/lab7/lab7.jsp");
        }
        else
        {
            PrintWriter out=response.getWriter();
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

            for (int i = 0; i < x_array.size(); ++i)
            {
                double x = x_array.getJsonNumber(i).doubleValue();
                double y = y_array.getJsonNumber(i).doubleValue();
                boolean isInArea = checkArea(x, y, r);
                if (doSave)
                    list.add(new Point(x, y, r, isInArea));
                result.add(isInArea);
            }
            JsonArray res = result.build();

            out.println(res);
        }

    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        errorMsg = "";
        config.getServletContext().setAttribute("errorMsg", errorMsg); //recounting all points, then adding new point
        try {
            if (isInputValid(request)) {
                if (list == null) {
                    list = new ArrayList<>();
                    config.getServletContext().setAttribute("list", list);
                }
                response.setContentType("text/html");

                //checking all old points with new radius and setting updated values
                for (int i = 0; i < list.size(); i++) {
                    Point p = list.get(i);
                    p.setRadius(radius);
                    if (checkArea(p))
                        p.setInArea(true);
                    else
                        p.setInArea(false);
                    list.set(i, p);
                }

                //adding new point
                Point currentPoint = new Point(x, y, radius, false);
                if (checkArea(currentPoint))
                    currentPoint.setInArea(true);
                list.add(currentPoint);
            }
        } catch (IllegalArgumentException e) {
            errorMsg = "Not correct values.";
        } finally {
            response.sendRedirect("/index.jsp");
        }
    }

    private boolean isInputValid(HttpServletRequest request) throws IllegalArgumentException, NumberFormatException {
        x = Double.valueOf(request.getParameter("coordinate_x"));
        y = Double.valueOf(request.getParameter("coordinate_y"));
        radius = Double.valueOf(request.getParameter("radius"));
        if (x > -3 && x < 5 && y > -3 && y < 3 && radius > 2 && radius < 5)
            return true;
        else
            throw new IllegalArgumentException("Значения параметров выходят за диапазон");
    }

    private boolean checkArea(Point point) {
        return (point.getX() >= 0 && point.getX() <= point.getRadius() / 2 && point.getY() >= 0 && point.getY() <= point.getRadius() / 2) ||
                (point.getX() <= 0 && point.getX() >= -point.getRadius() && point.getY() >= 0 && point.getY() <= point.getRadius()) ||
                (point.getX() <= 0 && Math.pow(point.getX(), 2) + Math.pow(point.getY(), 2) <= Math.pow(point.getRadius(), 2) && point.getY() <= 0);
    }
}
