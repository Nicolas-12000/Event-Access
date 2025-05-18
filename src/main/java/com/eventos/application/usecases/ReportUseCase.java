package com.eventos.application.usecases;

import com.eventos.application.ports.input.ReportInputPort;
import com.eventos.application.ports.output.AttendanceOutputPort;
import com.eventos.application.ports.output.EventOutputPort;
import com.eventos.model.Attendance;
import com.eventos.model.Event;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

@Service
public class ReportUseCase implements ReportInputPort {

    private final EventOutputPort eventOutputPort;
    private final AttendanceOutputPort attendanceOutputPort;

    public ReportUseCase(EventOutputPort eventOutputPort,
                        AttendanceOutputPort attendanceOutputPort) {
        this.eventOutputPort = eventOutputPort;
        this.attendanceOutputPort = attendanceOutputPort;
    }

    @Override
    public byte[] generateReportForEvent(Long eventId) {
        Event event = eventOutputPort.getEventById(eventId)
                .orElseThrow(() -> new IllegalArgumentException("Evento no encontrado con ID: " + eventId));

        List<Attendance> attendances = attendanceOutputPort.findByEventId(eventId);
        if (attendances.isEmpty()) {
            throw new IllegalArgumentException("No hay asistencias registradas para el evento: " + event.getName());
        }

        try (XSSFWorkbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("Asistencias - " + event.getName());

            addEventMetadata(sheet, event);


            addTableHeader(sheet);

            fillAttendanceData(sheet, attendances);

            return convertWorkbookToBytes(workbook);

        } catch (IOException e) {
            throw new IllegalArgumentException("Error de E/S: " + e.getMessage(), e);
        } catch (Exception e) {
            throw new IllegalArgumentException("Error inesperado: " + e.getMessage(), e);
        }
    }

    private void addEventMetadata(Sheet sheet, Event event) {
        Row metadataRow = sheet.createRow(0);
        metadataRow.createCell(0).setCellValue("Evento: " + event.getName());
        metadataRow.createCell(1).setCellValue("Fecha Inicio: " + event.getStartDate());
        metadataRow.createCell(2).setCellValue("Fecha Fin: " + event.getEndDate());
    }

    private void addTableHeader(Sheet sheet) {
        Row headerRow = sheet.createRow(2);
        String[] headers = {"Documento", "Nombre", "Sesiones", "Fecha Registro"};
        for (int i = 0; i < headers.length; i++) {
            Cell cell = headerRow.createCell(i);
            cell.setCellValue(headers[i]);
        }
    }

    private void fillAttendanceData(Sheet sheet, List<Attendance> attendances) {
        int rowIndex = 3;
        for (Attendance attendance : attendances) {
            Row row = sheet.createRow(rowIndex++);
            row.createCell(0).setCellValue(attendance.getStudent().getIdentityDocument());
            row.createCell(1).setCellValue(attendance.getStudent().getName());
            row.createCell(2).setCellValue(attendance.getStudent().getLastName());
            row.createCell(3).setCellValue(attendance.getStudent().getSemester());
            row.createCell(4).setCellValue(attendance.getStudent().getEmail());
            row.createCell(5).setCellValue(attendance.getStudent().getPhoneNumber());
            row.createCell(6).setCellValue(attendance.getNumberOfSessions());
            row.createCell(7).setCellValue(attendance.getRegistrationTime().toString());
        }
    }

    private byte[] convertWorkbookToBytes(XSSFWorkbook workbook) throws IOException {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        workbook.write(outputStream);
        return outputStream.toByteArray();
    }
}